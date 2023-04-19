import { query } from '../../../lib/db';
import { sendEmail } from '../../../utils/sendEmail';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const querySql = 'SELECT * FROM users WHERE email = ?';
      const { emails, groupId } = req.body;
      let message =
        'Users added or mail have been sent to them to join the app succesfully';
      for (const email of emails) {
        const valueParams = [email];
        const data = await query({ query: querySql, values: valueParams });
        if (data.length === 0) {
          sendEmail({
            email,
            subject: 'Join the app',
            message:
              'Join the Dhan Yojana app to join the group and manage your expenses'
          });
        }
        //check if the user is already in the GROUP or not
        const querySql3 =
          'SELECT groupId,userId from userInvolvedGroup WHERE userId = ? AND groupId = ?';
        const data3 = await query({
          query: querySql3,
          values: [data[0].id, groupId]
        });
        if (data3.length !== 0) {
          continue;
        }
        const querySql2 =
          'INSERT INTO userInvolvedGroup (userId, groupId) VALUES (?, ?)';
        const valueParams2 = [data[0].id, groupId];
        await query({ query: querySql2, values: valueParams2 });
        sendEmail({
          email,
          subject: 'Join the group',
          message: `You have been added to the ${'Group_name'} group`
        });
      }
      res.status(200).json({ message });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
