import { getServerSession } from 'next-auth';
import { query } from '../../../../lib/db';
import { authOptions } from '../../auth/[...nextauth]';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { groupId } = req.query;
      //Find userId from session
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;
      //check if the current session user is part of the group
      const querySql1 = 'SELECT * FROM userInvolvedGroup WHERE userId = ? AND groupId = ?';
      const valueParams1 = [userId, groupId];
      const data1 = await query({ query: querySql1, values: valueParams1 });
      if (data1.length === 0) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const querySql =
      'SELECT users.name,users.email,share.amount,share.owned,payments.paymentId,payments.title,payments.totalAmount,payments.type,payments.updatedAt FROM users JOIN share ON users.id = share.userId JOIN payments ON payments.paymentId = share.paymentId WHERE payments.groupId = ?';
      const valueParams = [groupId];
      const data = await query({ query: querySql, values: valueParams });

      res.status(200).json({ payments: data });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
