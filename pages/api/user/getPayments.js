import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req, res) {
  if (req.method === 'GET') {
    //TODO check if the current session user is part of the group
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;

      const querySql =
        'SELECT users.name,users.email,share.amount,share.owned,payments.paymentId,payments.title,payments.totalAmount,payments.type,payments.updatedAt FROM users JOIN share ON users.id = share.userId JOIN payments ON payments.paymentId = share.paymentId WHERE share.userId=?';
      const valueParams = [userId];
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
