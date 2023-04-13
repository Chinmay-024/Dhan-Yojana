import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      const { paymentId } = req.query;

      //TODO check if current session user is from the group

      const querySql1 = 'SELECT groupId from payments WHERE paymentId = ?';
      const data = await query({ query: querySql1, values: [paymentId] });
      if (data.length === 0) {
        res.status(500).json({ error: 'Group don;t exits!!!' });
      }

      const querySql =
        'SELECT users.email,users.image,users.name,comments.description from users JOIN comments ON users.id = comments.userId WHERE comments.paymentId = ?';
      const data1 = await query({ query: querySql, values: [paymentId] });

      res.status(200).json({ comments: data1 });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
