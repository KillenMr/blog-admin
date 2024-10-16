import React, { memo, } from "react";
import { Button, Space, Drawer } from "antd";

import { ProDescriptions } from "@ant-design/pro-components";

export type SoftDrawerProps = {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit?: (values: any, isUpdate: boolean) => Promise<void>;
  visible: boolean;
  values: Partial<any>;
  title?: string;
};

const SoftDrawer = memo((props: SoftDrawerProps) => {
  const { values, title } = props;

  const columns: any = [
    {
      title: '任务编号',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
    },
    {
      title: '到访时间',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务地点',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '来电单位',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务名称',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '航班类型',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务级别',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '来点人',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '主宾姓名',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '航班班次',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务类型',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '接电人',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '接电单位',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
  ];

  const handleOk = () => {
  };
  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <Drawer
      width={540}
      title={title}
      open={props.visible}
      destroyOnClose
      onClose={handleCancel}
      footer={
        <Space>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            确认
          </Button>
        </Space>
      }
    >
          <ProDescriptions
            column={2}
            // title={currentRow?.name}
            // request={async () => ({
            //   data: currentRow || {},
            // })}
            // params={{
            //   id: currentRow?.name,
            // }}
            columns={columns}
            dataSource={values}
          />
    </Drawer>
  );
});

export default SoftDrawer;
