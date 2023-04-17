import { query } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    //TODO make this request get and take groupId as a param
    try {
      const querySql =
        'SELECT name,email,image FROM users JOIN userInvolvedGroup ON users.id = userInvolvedGroup.userId WHERE groupId = ?';
      const valueParams = [req.body.groupId];
      const data = await query({ query: querySql, values: valueParams });
      //TODO Find the money spent on this user by the group
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
