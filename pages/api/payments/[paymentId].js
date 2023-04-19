import { getServerSession } from 'next-auth';
import { query } from '../../../lib/db';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { paymentId } = req.query;
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;

      const querySql =
        'SELECT name,email,image,amount,owned FROM users JOIN share ON users.id = share.userId WHERE share.paymentId = ?';
      const valueParams = [paymentId];
      const data = await query({ query: querySql, values: valueParams });

      const querySql2 = 'SELECT * FROM payments WHERE paymentId = ?';
      const data2 = await query({ query: querySql2, values: valueParams });

      //check if the current session user is part of the group
      const querySql3 =
        'SELECT groupId,userId from userInvolvedGroup WHERE userId = ? AND groupId = ?';
      const data3 = await query({
        query: querySql3,
        values: [userId, data2[0].groupId]
      });
      if (data3.length === 0) {
        res.status(401).json({ error: 'Not authorized!!!' });
        return;
      }

      res.status(200).json({ users: data, paymentDetails: data2[0] });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
