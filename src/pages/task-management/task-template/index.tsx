import OptionBtn from '@/components/OptionBtn';
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DownOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import AddDrawer from './components/AddDrawer';
import ExportDrawer from './components/ExportDrawer';
import type { FormValueType } from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { addRule, removeRule, rule, updateRule } from './service';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showAdd1, setShowAdd1] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '任务模板名称',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务类型',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务级别',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 140,
      render: (_, record) => [
        <OptionBtn key={'edit'} src="/images/icon-edit.png" onClick={handleOpenAdd} />,
        <OptionBtn key={'copy'} src="/images/icon-copy.png" />,
        <OptionBtn
          key={'delete'}
          src="/images/icon-delete.png"
          onClick={async () => {
            Modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemove(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        />,
      ],
    },
  ];

  const handleMenuClick: any = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menuProps = {
    items: [
      {
        label: '批量删除',
        key: '1',
      },
      {
        label: '批量复制',
        key: '2',
      },
      {
        label: '批量已办',
        key: '3',
      },
      {
        label: '批量待办',
        key: '4',
        danger: true,
        disabled: true,
      },
    ],
    onClick: handleMenuClick,
  };

  const handleOpenAdd = () => {};

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Dropdown key={'batch-operation'} menu={menuProps}>
            <Button type="primary">
              <Space>
                批量操作
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button key={'operation-1'} type="link" onClick={() => {}}>
            <AppstoreOutlined />
          </Button>,
          <Button
            key={'operation-2'}
            type="link"
            onClick={() => {
              setShowAdd(true);
            }}
          >
            <CloudDownloadOutlined />
          </Button>,
          <Button
            key={'operation-3'}
            type="link"
            onClick={() => {
              setShowAdd1(true);
            }}
          >
            <CloudUploadOutlined />
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <AddDrawer
        title="导入任务模板"
        onCancel={() => {
          setShowAdd(false);
          setCurrentRow(undefined);
        }}
        visible={showAdd}
        values={currentRow}
      />

      <ExportDrawer
        title="导出任务模板"
        onCancel={() => {
          setShowAdd1(false);
          setCurrentRow(undefined);
        }}
        visible={showAdd1}
        values={currentRow}
      />
    </PageContainer>
  );
};

export default TableList;
