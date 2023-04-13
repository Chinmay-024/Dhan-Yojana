import { query } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const querySql = 'SELECT * FROM users WHERE email = ?';
      const { emails, groupId } = req.body;
      for (const email of emails) {
        const valueParams = [email];
        const data = await query({ query: querySql, values: valueParams });
        if (data.length === 0) {
          //TODO send email to user to join the app
          res.status(200).json({ error: 'Invalid Request' });
        }
        const querySql2 =
          'INSERT INTO userInvolvedGroup (userId, groupId) VALUES (?, ?)';
        const valueParams2 = [data[0].id, groupId];
        await query({ query: querySql2, values: valueParams2 });
      }
      //TODO send email to user to join the group
      res.status(200).json({ message: 'user added succesfully' });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
