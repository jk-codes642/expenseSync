import React, { useState } from "react";
import { Radio, Select, Table } from "antd";
import { assets } from "../../assets/assets";
import Button from "../Button/Button";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const TransactionTable = ({
  user,
  transactions,
  fetchTransactions,
  addTransaction,
}) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Delete Transaction",
      key: "delete",
      render: (_, record) => (
        <img
          src={assets.deleteIcon}
          alt="delete"
          className="cursor-pointer hover:opacity-80"
          width="30"
          height="30"
          onClick={() => deleteTransaction(record.id)}
        />
      ),
    },
  ];

  const filterdData = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search) &&
      (typeFilter === "all" || item.type === typeFilter)
  );

  const sortedData = filterdData.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortKey === "amount") {
      return b.amount - a.amount;
    } else {
      return 0;
    }
  });

  const exportToCsv = () => {
    const csv = unparse({
      fields: ["name", "type", "amount", "date", "tag"],
      data: transactions,
    });

    const data = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCsv = (e) => {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async (result) => {
          for (const transaction of result.data) {
            console.log(transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction);
          }
        },
      });
      toast.success("All transactions added !");
      fetchTransactions();
      e.target.files = null;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      if (user) {
        const transactionDoc = doc(
          db,
          `users/${user.uid}/transactions`,
          transactionId
        );
        await deleteDoc(transactionDoc);
        toast.success("Transaction deleted successfully !");
        fetchTransactions();
      } else {
        toast.error("User is not logged in !");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not delete transaction !");
    }
  };

  return (
    <div className="w-full py-0 px-[2rem]">
      <div className="flex justify-between gap[1rem] items-center mb-[1rem]">
        <div className="flex justify-start items-center gap-[0.5rem] w-full shadow-lg border-zinc-900 py-0 px-[0.5rem]">
          <img src={assets.searchIcon} className="" width="26" />
          <input
            className="w-full p-[0.5rem] border-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </div>

        <Select
          className="w-[30%] mr-2 flex itmes-center shadow-[0px_0px_30px_8px_rgba(227,227,227,0.0.75)] rounded-[0.5rem] px-2"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="all">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="shadow-xl rounded-[0.5rem] p-[2rem] mb-[4rem]">
        <div className="flex justify-between items-center w-full mb-[1rem]">
          <h2>My Transactions</h2>
          <Radio.Group
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div className="flex justify-center gap-4">
            <Button text="Export to CSV" onClick={exportToCsv} />
            <label
              for="file-csv"
              className="bg-[#000435] text-white p-2 text-center my-6 mx-0 cursor-pointer border border-[#000435] hover:text-[#000435] hover:bg-white"
            >
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              className="hidden"
            />
          </div>
        </div>

        <Table
          dataSource={sortedData}
          columns={columns}
          record={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
