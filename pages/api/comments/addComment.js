import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      const { description, paymentId, email } = req.body;

      // Check if user is from the group
      const querySql1 = 'SELECT groupId from payments WHERE paymentId = ?';
      const data = await query({ query: querySql1, values: [paymentId] });
      if (data.length === 0) {
        res.status(500).json({ error: "Group don;t exits!!!" });
      }
      const groupId = data[0].groupId;

      const querySql =
        'SELECT users.id,users.name from users JOIN userInvolvedGroup ON users.id = userInvolvedGroup.userId JOIN groupTable ON userInvolvedGroup.groupId = groupTable.groupId WHERE users.email = ? AND groupTable.groupId = ?';
      const data1 = await query({ query: querySql, values: [email, groupId] });
      if (data1.length === 0) {
        res.status(500).json({ error: "User Don't belongs from this group" });
      }

      const querySql2 =
        'INSERT INTO comments (description,paymentId,userId) VALUES (?, ?, ?)';
      const valueParams2 = [description, paymentId, data1[0].id];
      await query({ query: querySql2, values: valueParams2 });

      //Update the payment table updatedAt
      const querySql3 = 'UPDATE payments SET updatedAt = ? WHERE paymentId = ?';
      const valueParams3 = [new Date(), paymentId];
      await query({ query: querySql3, values: valueParams3 });

      res.status(200).json({ message: 'Comment created succesfully' });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
