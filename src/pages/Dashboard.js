import React, { useState, useEffect } from "react";
import Navbar1 from "../components/Navbar/Navbar1";
import Cards from "../components/Cards/Cards";
import AddIncome from "../components/Modals/AddIncome";
import AddExpense from "../components/Modals/AddExpense";
import TransactionTable from "../components/TransactionTable/TransactionTable";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Consolidate Firestore imports
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Charts from "../components/Charts/Charts";
import NoTransactions from "../components/NoTransactions/NoTransactions";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
      paymentMode: values.paymentMode
    };

    // setTransaction([...transactions, newTransaction])
    // setIsExpenseModalVisible(false)
    // setIsIncomeModalVisible(false)
    addTransaction(newTransaction);
    // calculateBalance()
  };

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log(docRef.id);
      if (!many) toast.success("transaction added !");
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    } catch (error) {
      console.log(error);
      if (!many) toast.error("Could not add transaction !");
    }
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else if (transaction.type === "expense") {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal.toFixed(2));
    setExpense(expenseTotal.toFixed(2));
    setCurrentBalance((incomeTotal - expenseTotal).toFixed(2));
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapShot = await getDocs(q);

        let transactionsArray = [];

        querySnapShot.forEach((doc) => {
          transactionsArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setTransactions(transactionsArray);
        console.log(transactionsArray);
        if(transactionsArray.length > 0) {
          toast.success("Transaction fetched !");
        }
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    setLoading(false);
  };

  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const resetBalance = async () => {
    try {
      if (user) {
        const transactionsRef = collection(
          db,
          `users/${user.uid}/transactions`
        );
        const querySnapshot = await getDocs(transactionsRef);

        // Delete each transaction document
        const deletePromises = querySnapshot.docs.map((docSnapshot) =>
          deleteDoc(doc(db, `users/${user.uid}/transactions`, docSnapshot.id))
        );

        await Promise.all(deletePromises);

        // Reset states
        setTransactions([]);
        setIncome(0);
        setExpense(0);
        setCurrentBalance(0);

        toast.success("Balance reset successfully!");
      } else {
        toast.error("User is not logged in!");
      }
    } catch (error) {
      console.error("Error resetting balance:", error);
      toast.error("Could not reset balance!");
    }
  };

  return (
    <>
      <Navbar1 />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            currentBalance={currentBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBalance={resetBalance}
          />
          {transactions.length != 0 ? (
            <Charts sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

          <TransactionTable
            user={user}
            transactions={transactions}
            fetchTransactions={fetchTransactions}
            addTransaction={addTransaction}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
