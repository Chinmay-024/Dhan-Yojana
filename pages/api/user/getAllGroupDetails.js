import { query } from '../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;
      // console.log("In backend",userId);
      //TODO
      // const userId = 'a23e67ba-5fdb-4565-9f5d-be4ca9e39e7d';

      //Find the groups that the user is involved in and get the payment details for each group

      const querySql =
        'SELECT groupTable.groupId,groupTable.title,groupTable.image,groupTable.description,groupTable.groupId FROM userInvolvedGroup JOIN groupTable ON userInvolvedGroup.groupId = groupTable.groupId WHERE userInvolvedGroup.userId = ?';
      // 'SELECT groupTable.title,groupTable.image,groupTable.description,payments.totalAmount,payments.type,payments.currency FROM userInvolvedGroup JOIN groupTable ON userInvolvedGroup.groupId = groupTable.groupId JOIN payments ON groupTable.groupId = payments.groupId WHERE userInvolvedGroup.userId = ?';
      const valueParams = [userId];
      const data = await query({ query: querySql, values: valueParams });
      const paymentDetails = [];
      const totalAmountForGroups = [];
      let totalAmount = 0.0,
        totalAmountForMonth = 0.0;
      for (let i = 0; i < data.length; i++) {
        const querySql1 =
          'SELECT SUM(payments.totalAmount) AS total,payments.type FROM payments WHERE payments.groupId = ? GROUP BY payments.type';
        const valueParams1 = [data[i].groupId];
        const data1 = await query({ query: querySql1, values: valueParams1 });
        paymentDetails.push(data1);
        const querySql2 =
          'SELECT share.amount,share.owned,payments.createdAt FROM share JOIN payments ON share.paymentId = payments.paymentId WHERE payments.groupId = ? AND share.userId = ?';
        const valueParams2 = [data[i].groupId, userId];
        const data2 = await query({ query: querySql2, values: valueParams2 });
        let totalAmountForGroup = 0.0;
        for (let j = 0; j < data2.length; j++) {
          // console.log(data2[j].owned, parseFloat(amount));
          let amount = parseFloat(data2[j].amount);
          if (data2[j].owned) {
            // totalAmount += amount;
            totalAmountForGroup += amount;
          } else {
            totalAmount -= amount;
            totalAmountForGroup -= amount;
          }
          //Find the totalAmount for the month
          const date = new Date(data2[j].createdAt);
          const month = date.getMonth();
          if (month === new Date().getMonth()) {
            if (data2[j].owned) {
              // totalAmountForMonth += amount;
            } else {
              totalAmountForMonth -= amount;
            }
          }
        }
        //Find the total amount of money that the user has to pay for each group
        totalAmountForGroups.push(totalAmountForGroup);
      }

      res.status(200).json({
        groups: data,
        paymentDetails,
        totalAmountForGroups,
        totalAmount,
        totalAmountForMonth
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
