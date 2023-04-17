import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
async function handler(req, res) {
  console.log(
    'arrived-----------------------------------------------------------------------'
  );
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      const {
        title,
        type,
        totalAmount,
        currency,
        groupId,
        users: usersData
      } = req.body;

      const querySql3 = 'SELECT * from groupTable WHERE groupId=?';
      const data1 = await query({ query: querySql3, values: [groupId] });
      if (data1.length === 0) {
        res.status(500).json({ error: "Group Don't exist" });
      }
      console.log('group', usersData);

      const date = new Date();
      const querySql =
        'INSERT INTO payments (title,type, totalAmount, currency, groupId,createdAt,updatedAt) VALUES (?, ?, ?,?, ?, ?,?)';
      const valueParams = [
        title,
        type,
        totalAmount,
        currency,
        groupId,
        date,
        date
      ];
      const data = await query({ query: querySql, values: valueParams });
      console.log('payment success');

      const paymentId = data.insertId;
      for (const user of usersData) {
        // console.log('obj', user);
        const querySql2 = 'SELECT * FROM users WHERE email=?';
        const valueParams2 = [user.email];
        const userObtained = await query({
          query: querySql2,
          values: valueParams2
        });
        const querySql4 =
          'INSERT INTO share (paymentId,userId,amount,owned) VALUES (?, ?, ?,?)';
        const valueParams4 = [
          paymentId,
          userObtained[0].id,
          user.amount,
          user.owned
        ];
        await query({ query: querySql4, values: valueParams4 });
      }

      res.status(200).json({ message: 'Payment created succesfully' });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
