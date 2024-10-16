import OptionBtn from '@/components/OptionBtn';
import { AppstoreOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Input, message, Modal, Space } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import AddDrawer from './components/AddDrawer';
import DetailForm from './components/DetailDrawer';
import type { FormValueType } from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { addRule, removeRule, rule, updateRule } from './service';
import useStyles from './style.style';
import SoftDrawer from './components/SoftDrawer';
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

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showSoftList, setShowSoftList] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const { styles } = useStyles();

  const handleOpenDetail = useCallback(() => {
    setShowDetail(!showDetail);
  }, []);
  const handleOpenAdd = useCallback(() => {
    console.log(' >>>>>>');
    setShowAdd(!showAdd);
  }, []);

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

  const columns: any = [
    {
      title: '任务编号',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      renderText: () => {
        return '20240822001';
      }, 
    },
    {
      title: '任务名称',
      dataIndex: 'desc',
      valueType: 'textarea',
      renderText: () => {
        return '任务名称1';
      }, 
    },
    {
      title: '任务时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderText: () => {
        return '2024-08-22 10:00';
      }, 
    },
    {
      title: '航班类型',
      dataIndex: 'desc',
      valueType: 'textarea',
      renderText: () => {
        return '专机';
      }, 
    },
    {
      title: '航班班次',
      dataIndex: 'desc',
      valueType: 'textarea',
      renderText: () => {
        return 'CA123';
      }, 
      
    },
    {
      title: '中外',
      dataIndex: 'desc',
      valueType: 'textarea',
      renderText: () => {
        return '中方';
      }, 
    },
    {
      title: '抵离',
      dataIndex: 'desc',
      valueType: 'textarea',
      renderText: () => {
        return '抵';
      }, 
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
      title: '任务地点',
      dataIndex: 'desc',
      valueType: 'textarea',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <OptionBtn key={'detail'} src="/images/icon-detail.png" onClick={handleOpenDetail} />,
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

  return (
    <PageContainer header={{ title: '' }}>
      <ProTable
        headerTitle="查询表格"
        pagination={{ position: ['bottomCenter'], showQuickJumper: true }}
        actionRef={actionRef}
        rowKey="key"
        rowClassName={(record, index) => (index % 2 === 0 ? 'par_blue_even' : 'par_gray_odd')}
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
              setShowAdd(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button key={'operation-1'}  type="primary" onClick={() => {
              setShowSoftList(true);
          }}>
            <AppstoreOutlined />
          </Button>
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <DetailForm
        title="任务受领信息"
        onCancel={() => {
          setShowDetail(false);
          setCurrentRow(undefined);
          // if (actionRef.current) {
          //   actionRef.current.reload();
          // }
        }}
        visible={showDetail}
        values={currentRow}
      />
      <SoftDrawer
        title="任务受领信息"
        onCancel={() => {
          setShowSoftList(false);
          setCurrentRow(undefined);
          // if (actionRef.current) {
          //   actionRef.current.reload();
          // }
        }}
        visible={showSoftList}
        values={currentRow}
      />
      <AddDrawer
        title="任务受领信息"
        onCancel={() => {
          setShowAdd(false);
          setCurrentRow(undefined);
        }}
        visible={showAdd}
        values={currentRow}
      />
    </PageContainer>
  );
};

export default TableList;
