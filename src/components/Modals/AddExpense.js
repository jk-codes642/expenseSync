import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddExpense = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
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
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Payment Mode"
          name="paymentMode"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select a payment mode!" }]}
        >
          <Select>
            <Select.Option value="online">Online</Select.Option>
            <Select.Option value="offline">Offline</Select.Option>
            <Select.Option value="directBank">Direct Bank</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select>
            <Select.Option value="fromFriend">From Friend</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="office">Office</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="health">Health</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="rent">Rent</Select.Option>
            <Select.Option value="utilities">Utilities</Select.Option>
            <Select.Option value="groceries">Groceries</Select.Option>
            <Select.Option value="fitness">Fitness</Select.Option>
            <Select.Option value="investments">Investments</Select.Option>
            <Select.Option value="transportation">Transportation</Select.Option>
            <Select.Option value="gifts">Gifts</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full bg-[#000435] hover:!bg-[#121b7d]"
            type="primary"
            htmlType="submit"
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;
