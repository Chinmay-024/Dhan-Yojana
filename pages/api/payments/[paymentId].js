import { query } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'GET') {
    //TODO check if the current session user is part of the group
    try {
      const { paymentId } = req.query;
      const querySql =
        'SELECT name,email,image,amount,owned FROM users JOIN share ON users.id = share.userId WHERE share.paymentId = ?';
      const valueParams = [paymentId];
      const data = await query({ query: querySql, values: valueParams });

      const querySql2 = 'SELECT * FROM payments WHERE paymentId = ?';
      const data2 = await query({ query: querySql2, values: valueParams });

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
