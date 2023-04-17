import { query } from '../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      //   const userId = session.user.id;
      const userId = 'd0ab040d-c015-4c34-a187-c99898d8e9dc';
      //find the user payments details month wise
      const userPayments = [];
      const userPaymentMonthWise = [];

      for (let i = 0; i < 12; i++) {
        const querySql =
          'SELECT payments.totalAmount,payments.type,payments.currency,share.amount,share.owned FROM share JOIN payments ON share.paymentId = payments.paymentId WHERE share.userId = ? AND MONTH(payments.createdAt) = ? AND payments.groupId = ? ORDER BY payments.createdAt DESC';
        const valueParams = [userId, i + 1, req.query.groupId];
        const data = await query({ query: querySql, values: valueParams });
        userPayments.push(data);
      }
      //Find the total amount of money that the user has expensed for each month
      for (let i = 0; i < userPayments.length; i++) {
        let totalAmount = 0.0;
        for (let j = 0; j < userPayments[i].length; j++) {
          let amount = parseFloat(userPayments[i][j].amount);
          if (userPayments[i][j].owned) {
            totalAmount += amount;
          } else {
            totalAmount -= amount;
          }
        }
        userPaymentMonthWise.push(totalAmount);
      }

      //Find the total amount of money that has been expensed for each month in this group
      const groupPayments = [];
      const groupPaymentMonthWise = [];
      for (let i = 0; i < 12; i++) {
        const querySql =
          'SELECT payments.totalAmount,payments.type,payments.currency FROM payments WHERE MONTH(payments.createdAt) = ? AND payments.groupId = ? ORDER BY payments.createdAt DESC';
        const valueParams = [i + 1, req.query.groupId];
        const data = await query({ query: querySql, values: valueParams });
        groupPayments.push(data);
      }

      for (let i = 0; i < groupPayments.length; i++) {
        let totalAmount = 0.0;
        for (let j = 0; j < groupPayments[i].length; j++) {
          let amount = parseFloat(groupPayments[i][j].totalAmount);
          totalAmount += amount;
        }
        groupPaymentMonthWise.push(totalAmount);
      }

      res.status(200).json({
        userPayments,
        userPaymentMonthWise,
        groupPayments,
        groupPaymentMonthWise
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
