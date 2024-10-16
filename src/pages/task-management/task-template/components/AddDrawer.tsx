import { DrawerForm, ProFormText, ProFormUploadDragger } from '@ant-design/pro-components';
export default (props: any) => {
  const { visible, onCancel, title} = props;

  return (
    <DrawerForm
      width={560}
      open={visible}
      layout="horizontal"
      onFinish={async (values) => {
        console.log(values);
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: onCancel,
      }}
      title={title}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '任务模板名称为必填项',
          },
        ]}
        width="md"
        name="name"
        label="任务模板名称"
      />
      <ProFormUploadDragger
        max={4}
        label="上传文件"
        name="dragger"
        rules={[
          {
            required: true,
          },
        ]}
      />
    </DrawerForm>
  );
};
