"use client";
import { Form, FormProps, Input } from "antd";
import { UiButton } from "../base/UiButton";
import clsx from "clsx";

type SearchCustomProps = FormProps
type FieldType = {
  search?: string;
};

const SearchCustom = ({ className, ...props }: SearchCustomProps) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => { };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => { };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={clsx(className, "flex items-center gap-[15px] max-w-[600px]")}
      {...props}
    >
      <Form.Item<FieldType> label="" name="search" className="w-full">
        <Input className="h-[44px]" placeholder="Nhập từ khóa tìm kiếm" />
      </Form.Item>
      <Form.Item label={null}>
        <UiButton>Tìm kiếm</UiButton>
      </Form.Item>
    </Form>
  );
};

export default SearchCustom;
