import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
        const userId = session.user.id;
      //TODO change this
      // const userId = 'd0ab040d-c015-4c34-a187-c99898d8e9dc';
      //find the user payments details month wise
      const payments = [];
      const paymentMonthWise = [];
      for (let i = 0; i < 12; i++) {
        const querySql =
          'SELECT payments.totalAmount,payments.type,payments.currency,share.amount,share.owned FROM share JOIN payments ON share.paymentId = payments.paymentId WHERE share.userId = ? AND MONTH(payments.createdAt) = ?  ORDER BY payments.createdAt DESC';
        const valueParams = [userId, i + 1];
        const data = await query({ query: querySql, values: valueParams });
        payments.push(data);
      }
      //Find the total amount of money that the user has expensed for each month
      for (let i = 0; i < payments.length; i++) {
        let totalAmount = 0.0;
        for (let j = 0; j < payments[i].length; j++) {
          let amount = parseFloat(payments[i][j].amount);
          if (payments[i][j].owned) {
            totalAmount += amount;
          } else {
            totalAmount -= amount;
          }
        }
        paymentMonthWise.push(totalAmount);
      }

      res.status(200).json({
        payments,
        paymentMonthWise
      });
    } catch (error) {
      // unhide to check error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid Request' });
  }
}

export default handler;
