import { Line, Pie } from "@ant-design/charts";
import React from "react";

const Charts = ({ sortedTransactions = [] }) => {
  const data = sortedTransactions.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
  }));

  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  const finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 900,
    autoFit: true,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 400,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div className="flex flex-row justify-between items-start w-full h-auto p-8 gap-8">
      {/* Line Chart Box */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="mt-0 mb-4 text-2xl font-semibold text-gray-800">
          Financial Statistics
        </h2>
        <Line {...config} />
      </div>

      {/* Pie Chart Box */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="mt-0 mb-4 text-2xl font-semibold text-gray-800">
          Total Spending
        </h2>
        <Pie {...spendingConfig} />
      </div>
    </div>

    // <div>
    //   <div>
    //     <h2 className="mt-0 mb-2 text-2xl">Your Analytics</h2>
    //     <Line {...config} />
    //   </div>
    //   <div>
    //     <h2 className="mt-0 text-2xl">Your Spendings</h2>
    //     <Pie {...spendingConfig} />
    //   </div>
    // </div>
  );
};

export default Charts;
