import { BetaSchemaForm } from '@ant-design/pro-components';
import { rule_required } from '@/utils/schemaConfigs';
export default (props: any) => {
  const { visible, onCancel } = props;
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          rule_required
        ],
      },
    },
    {
      title: '主宾姓名',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          rule_required
        ],
      },
    },
    {
      title: '到访时间',
      dataIndex: 'title',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          rule_required
        ],
      },
    },
    {
      title: "航班类型",
      dataIndex: "desc",
      valueType: "select",
      fieldProps: { placeholder: "请选择" },
      valueEnum: {
        int: { text: "地点一", status: "int" },
        string: { text: "地点二", status: "string" },
        double: { text: "地点三", status: "double" },
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "此项为必填项" }],
        };
      },
    },
    {
      title: "航班班次",
      dataIndex: "desc",
      valueType: "select",
      fieldProps: { placeholder: "请选择" },
      valueEnum: {
        int: { text: "地点一", status: "int" },
        string: { text: "地点二", status: "string" },
        double: { text: "地点三", status: "double" },
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "此项为必填项" }],
        };
      },
    },

    {
      title: "任务地点",
      dataIndex: "desc",
      valueType: "select",
      fieldProps: { placeholder: "请选择" },
      valueEnum: {
        int: { text: "地点一", status: "int" },
        string: { text: "地点二", status: "string" },
        double: { text: "地点三", status: "double" },
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: "此项为必填项" }],
        };
      },
    },
    {
      title: '接收时间',
      dataIndex: 'title',
      valueType: 'dateTime',
      formItemProps: {
        rules: [
          rule_required
        ],
      },
    },
    {
      title: '来电单位',
      dataIndex: 'title',
    },
    {
      title: '来电人',
      dataIndex: 'title',
    },
    {
      title: '接电人',
      dataIndex: 'title',
    },
    {
      title: '通知单位',
      dataIndex: 'title',
    },
  ];

  return (
    <BetaSchemaForm
      width={560}
      layoutType={'DrawerForm'}
      open={visible}
      layout='horizontal'
      onFinish={async (values) => {
        console.log(values);
      }}
      drawerProps={{
        destroyOnClose: true,
        onClose: onCancel,
      }}
      columns={columns}
    />
  );
};
