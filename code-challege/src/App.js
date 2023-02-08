import React, { useState, useEffect } from "react";
const data = [
  {
    customer: "Micheal Bob",
    transactions: [
      { month: "January", amount: 120 },
      { month: "January", amount: 120 },
      { month: "January", amount: 120 },
      { month: "February", amount: 120 },
      { month: "February", amount: 120 },
      { month: "March", amount: 140 },
      { month: "March", amount: 140 },
    ],
  },
  {
    customer: "Tao Munck",
    transactions: [
      { month: "January", amount: 60 },
      { month: "January", amount: 160 },
      { month: "February", amount: 110 },
      { month: "February", amount: 210 },
      { month: "March", amount: 90 },
      { month: "March", amount: 120 },
    ],
  },
];
const Transaction = ({ transaction }) => {
  let points = 0;
  if (transaction.amount > 100) {
    points += 2 * (transaction.amount - 100);
  }
  if (transaction.amount > 50 && transaction.amount <= 100) {
    points += 1 * (transaction.amount - 50);
  }
  return (
    <p>
      {transaction.month}: {points} points
    </p>
  );
};

const Customer = ({ customer }) => {
  const [pointsByMonth, setPointsByMonth] = useState({});

  useEffect(() => {
    const points = customer.transactions.reduce((acc, transaction) => {
      let transactionPoints = 0;
      if (transaction.amount > 100) {
        transactionPoints += 2 * (transaction.amount - 100) + 50;
      }
      if (transaction.amount > 50 && transaction.amount <= 100) {
        transactionPoints += 1 * (transaction.amount - 50);
      }

      if (!acc[transaction.month]) {
        acc[transaction.month] = 0;
      }
      acc[transaction.month] += transactionPoints;
      return acc;
    }, {});
    setPointsByMonth(points);
  }, [customer.transactions]);

  return (
    <div>
      <h2>{customer.customer}</h2>
      <p>
        Total points: {Object.values(pointsByMonth).reduce((a, b) => a + b, 0)}
      </p>
      {Object.keys(pointsByMonth).map((month) => (
        <p key={month}>
          {month}: {pointsByMonth[month]} points
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    //fetching data simulation
    setTimeout(() => {
      setCustomers(data);
    }, 2000);
  }, []);

  return (
    <div>
      {customers.map((customer) => (
        <Customer key={customer.customer} customer={customer} />
      ))}
    </div>
  );
};

export default App;
