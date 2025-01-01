import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddIncome = ({ isIncomeModalVisible, handleIncomeCancel, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="trading">Trading</Select.Option>
            <Select.Option value="business">Business</Select.Option>
            <Select.Option value="rental-income">Rental Income</Select.Option>
            <Select.Option value="dividends">Dividends</Select.Option>
            <Select.Option value="side-hustle">Side Hustle</Select.Option>
            <Select.Option value="royalties">Royalties</Select.Option>
            <Select.Option value="cashback">Cashback</Select.Option>
            <Select.Option value="bonus">Bonus</Select.Option>
            <Select.Option value="scholarship">Scholarship</Select.Option>
            <Select.Option value="pension">Pension</Select.Option>
            <Select.Option value="grants">Grants</Select.Option>
            <Select.Option value="lottery">Lottery</Select.Option>
            <Select.Option value="refunds">Refunds</Select.Option>
            <Select.Option value="allowance">Allowance</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full bg-[#000435] hover:!bg-[#121b7d]"
            type="primary"
            htmlType="submit"
          >
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncome;
