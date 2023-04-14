import { query } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const querySql = 'SELECT name,email,image FROM users';
      const valueParams = [];
      const data = await query({ query: querySql, values: valueParams });
      res.status(200).json({ users: data });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
