'use client';

import { useState, useEffect } from 'react';

interface Transaction {
  owned: boolean;
  amount: number;
  email: string;
}

interface NetAmounts {
  [email: string]: number;
}

interface Result {
  payer: string;
  receiver: string;
  amount: number;
}

export default function Settle() {
  // useEffect(() => {
  //   const expenseData = async () => {
  //     const res = await fetch('/api/user/getPayments');
  //     const resData = await res.json();
  //     console.log('sadada', resData.payments);
  //   };
  //   expenseData();
  // }, []);

  const transactions: Transaction[] = [
    { owned: true, amount: 100, email: 'user1@example.com' },
    { owned: true, amount: 50, email: 'user2@example.com' },
    { owned: false, amount: 25, email: 'user1@example.com' },
    { owned: false, amount: 75, email: 'user2@example.com' },
    { owned: true, amount: 200, email: 'user2@example.com' },
    { owned: false, amount: 200, email: 'user3@example.com' },
    { owned: false, amount: 50, email: 'user4@example.com' }
  ];

  const netAmounts: NetAmounts = {};
  const positiveNetAmounts: NetAmounts = {};
  const negativeNetAmounts: NetAmounts = {};
  const result: Result[] = [];

  // Calculate net amounts for each user
  for (const transaction of transactions) {
    if (!(transaction.email in netAmounts)) {
      netAmounts[transaction.email] = 0;
    }
    netAmounts[transaction.email] +=
      transaction.amount * (transaction.owned ? 1 : -1);
  }

  // Group users into positive and negative net amounts
  for (const email in netAmounts) {
    const netAmount = netAmounts[email];
    if (netAmount > 0) {
      positiveNetAmounts[email] = netAmount;
    } else if (netAmount < 0) {
      negativeNetAmounts[email] = netAmount * -1;
    }
  }
  var sum = 0;
  for (const posEmail in positiveNetAmounts)
    sum += positiveNetAmounts[posEmail];
  console.log('sum = ' + sum);
  for (const negEmail in negativeNetAmounts) {
    const negAmount = negativeNetAmounts[negEmail];

    for (const posEmail in positiveNetAmounts) {
      const posAmount = positiveNetAmounts[posEmail];
      const amountToGive = ((negAmount * posAmount) / sum) * 1.0;
      result.push({
        payer: negEmail,
        receiver: posEmail,
        amount: amountToGive
      });
    }
  }

  console.log(result);

  return <div>Settle</div>;
}
