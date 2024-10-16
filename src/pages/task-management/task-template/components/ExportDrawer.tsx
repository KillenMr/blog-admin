import { DrawerForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
export default (props: any) => {
  const { visible, onCancel, title } = props;

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
      <ProFormSelect
        name="select2"
        label="导出格式"
        request={async () => [
          { label: 'Word', value: 'all' },
          { label: 'PDF', value: 'open' },
          { label: 'EXCEL', value: 'closed' },
        ]}
        placeholder="请选择"
        rules={[{ required: true, message: '请选择' }]}
      />
    </DrawerForm>
  );
};
