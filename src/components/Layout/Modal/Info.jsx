import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Row, Col, Input, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { StyledModal } from "./styled";
import { apiUpdateUser } from "../../../services/request/api";
import { setAdmin } from "../../../redux/appSlice";
import { ShowError, ShowSuccess } from "../../Message";

const Info = (_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const admin = useSelector((state) => state.app.admin);

  useImperativeHandle(ref, () => ({
    open: () => {
      form.setFieldsValue(admin);
      setIsModalOpen(true);
    },
  }));

  const onFinish = async (values) => {
    try {
      const data = await apiUpdateUser({
        ...values,
        role: "ADMIN",
        id: admin?.id,
      });
      dispatch(setAdmin(data?.content));
      ShowSuccess("Successfully edited");
      handleCancel();
    } catch (error) {
      ShowError(error?.response?.data?.content);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <StyledModal
      open={isModalOpen}
      onCancel={handleCancel}
      width="50%"
      footer={null}
      destroyOnClose
      title={<h3>Account Information</h3>}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Row gutter={[12, 12]} style={{ width: "100%" }}>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Full Name</p>}
              name="name"
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Email</p>}
              name="email"
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label={<p style={{ fontWeight: 500, fontSize: 15 }}>Phone</p>}
              name="phone"
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space style={{ width: "100%", justifyContent: "center" }}>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                style={{ width: "100px" }}
              >
                Save
              </Button>
              <Button
                size="large"
                type="primary"
                style={{ width: "100px" }}
                onClick={handleCancel}
              >
                Close
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </StyledModal>
  );
};

export default forwardRef(Info);
