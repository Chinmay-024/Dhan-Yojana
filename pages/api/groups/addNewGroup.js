import { query } from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req,res, authOptions);
      const querySql =
        'INSERT INTO groupTable (title, description,image) VALUES (?, ?, ?)';
      const valueParams = [
        req.body.title,
        req.body.description,
        req.body.image
      ];
      const data = await query({ query: querySql, values: valueParams });
      const querySql2 =
        'INSERT INTO userInvolvedGroup (userId, groupId) VALUES (?, ?)';
      //TODO: Take the user id from the session
      const valueParams2 = [req.body.userId, data.insertId];
      await query({ query: querySql2, values: valueParams2 });
      res.status(200).json({ message: 'Group created succesfully' });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
