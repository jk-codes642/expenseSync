import React from "react";
import { Card, Row } from "antd";

const Cards = ({
  income,
  expense,
  currentBalance,
  showIncomeModal,
  showExpenseModal,
  resetBalance
}) => {
  return (
    <div>
      <Row className="grid grid-cols-3 gap-4 justify-between items-center my-[2rem] mx-auto w-[90%]">
        <Card
          className="shadow-lg min-w-[400px] p-[0.2rem] m-[2rem]"
          title="Current Balance"
        >
          <p className="m-4 text-base">₹{currentBalance}</p>
          <button onClick={resetBalance} className="text-center my-6 mx-0 p-2 border w-full border-[#000435] bg-[#000435] text-white cursor-pointer flex items-center justify-center h-auto rounded-md hover:bg-white hover:text-[#000435]">
            Reset Balance
          </button>
        </Card>
        <Card
          className="shadow-lg min-w-[400px] p-[0.2rem] m-[2rem]"
          title="Total Income"
        >
          <p className="m-4 text-base">₹{income}</p>
          <button onClick={showIncomeModal} className="text-center my-6 mx-0 p-2 border w-full border-[#000435] bg-[#000435] text-white cursor-pointer flex items-center justify-center h-auto rounded-md hover:bg-white hover:text-[#000435]">
            Add Income
          </button>
        </Card>
        <Card
          className="shadow-lg min-w-[400px] p-[0.2rem] m-[2rem]"
          title="Total Expense"
        >
          <p className="m-4 text-base">₹{expense}</p>
          <button onClick={showExpenseModal} className="text-center my-6 mx-0 p-2 border w-full border-[#000435] bg-[#000435] text-white cursor-pointer flex items-center justify-center h-auto rounded-md hover:bg-white hover:text-[#000435]">
            Add Expense
          </button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
