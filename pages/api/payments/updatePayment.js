import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      const { groupId, users: usersData, paymentId } = req.body;

      const querySql3 = 'SELECT * from groupTable WHERE groupId=?';
      const data1 = await query({ query: querySql3, values: [groupId] });
      if (data1.length === 0) {
        res.status(500).json({ error: "Group Don't exist" });
      }

      for (const user of usersData) {
        // console.log('obj', user);
        //TODO check if user exists in group and if not add him to group

        const querySql2 = 'SELECT * FROM users WHERE email=?';
        const valueParams2 = [user.email];
        const userObtained = await query({
          query: querySql2,
          values: valueParams2
        });
        let userId = userObtained[0].id;
        let querySql4 =
          'UPDATE share SET amount=?, owned=? WHERE paymentId=? AND userId=?';

        const querySql5 = 'SELECT * FROM share WHERE paymentId=? AND userId=?';
        const valueParams5 = [paymentId, userId];
        const data2 = await query({ query: querySql5, values: valueParams5 });
        if (data2.length === 0) {
          querySql4 =
            'INSERT INTO share (amount,owned,paymentId,userId) VALUES (?, ?, ?,?)';
        }

        const valueParams4 = [user.amount, user.owned, paymentId, userId];
        await query({ query: querySql4, values: valueParams4 });
      }

      res.status(200).json({ message: 'Payment updated succesfully' });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
