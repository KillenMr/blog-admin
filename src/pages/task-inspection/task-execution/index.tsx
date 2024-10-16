import CardView from '@/components/CardView';
import { DownloadOutlined, DownOutlined, FullscreenOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import type { DatePickerProps, GetProps, MenuProps } from 'antd';
import { Button, DatePicker, Dropdown, Input, message, Space, Tabs } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import { TabsItems, Types, TypesEqual } from './constants';
import type { TableListItem, TableListPagination } from './data';
import { addRule, removeRule, rule, updateRule } from './service';
import useStyles from './style.style';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { RangePicker } = DatePicker;

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

  const [formValueType, setFormValueType] = useState<string>(Types[0].label);
  const [formValueTypeEqual, setFormValueTypeEqual] = useState<string>(TypesEqual[0].label);

  const { styles } = useStyles();
  const formRef = useRef<ProFormInstance>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '任务编号',
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
      title: '任务名称',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '任务时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '航班类型',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '航班班次',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '中外',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '抵离',
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
      title: '任务地点',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
  ];

  const columnsExecution: any[] = [
    {
      dataIndex: 'state',
      valueType: 'checkbox',
      valueEnum: {
        AT_MOST_ONCE: { text: '核实起降方向' },
      },
    },
    {
      dataIndex: 'name',
      valueType: 'text',
    },
    // 2
    {
      dataIndex: 'state',
      valueType: 'checkbox',
      valueEnum: {
        AT_MOST_ONCE: { text: '核实勤务重要时间（抵京：专机降落时间）' },
      },
    },
    {
      dataIndex: 'creationTimp',
      valueType: 'dateTime',
      fieldProps: {
        // size: 'large',
        styles: {
          
        }
      },
    },
    // 3
    {
      dataIndex: 'state',
      valueType: 'checkbox',
      valueEnum: {
        AT_MOST_ONCE: { text: '休息室、警卫路线、客梯车防爆安检情况' },
      },
      colProps: {
        xs: 24,
        md: 8,
      },
    },
    {
      dataIndex: 'ewqr',
      valueType: 'time',
      fieldProps: {
        format: 'HH:mm',
      },
      colProps: {
        xs: 24,
        md: 4,
      },
    },
    {
      dataIndex: 'name',
      valueType: 'text',
    },
        // 3
        {
          dataIndex: 'state',
          valueType: 'checkbox',
          valueEnum: {
            AT_MOST_ONCE: { text: '设备、设施、通道检查' },
          },
          colProps: {
            xs: 24,
            md: 8,
          },
        },
        {
          dataIndex: 'ewqr',
          valueType: 'time',
          fieldProps: {
            format: 'HH:mm',
          },
          colProps: {
            xs: 24,
            md: 4,
          },
        },
        {
          dataIndex: 'name',
          valueType: 'text',
        },
            // 3
    {
      dataIndex: 'state',
      valueType: 'checkbox',
      valueEnum: {
        AT_MOST_ONCE: { text: '九号楼主楼、南配楼清场、制高点检查' },
      },
      colProps: {
        xs: 24,
        md: 8,
      },
    },
    {
      dataIndex: 'ewqr',
      valueType: 'time',
      fieldProps: {
        format: 'HH:mm',
      },
      colProps: {
        xs: 24,
        md: 4,
      },
    },
    {
      dataIndex: 'name',
      valueType: 'text',
    },
        // 3
        {
          dataIndex: 'state',
          valueType: 'checkbox',
          valueEnum: {
            AT_MOST_ONCE: { text: '中心现场清场' },
          },
          colProps: {
            xs: 24,
            md: 8,
          },
        },
        {
          dataIndex: 'ewqr',
          valueType: 'time',
          fieldProps: {
            format: 'HH:mm',
          },
          colProps: {
            xs: 24,
            md: 4,
          },
        },
        {
          dataIndex: 'name',
          valueType: 'text',
        },
            // 7 
    {
      dataIndex: 'state',
      valueType: 'checkbox',
      valueEnum: {
        AT_MOST_ONCE: { text: '外围实施管制，通道大门、机坪大门开启' },
      },
      colProps: {
        xs: 24,
        md: 8,
      },
    },
    {
      dataIndex: 'ewqr',
      valueType: 'time',
      fieldProps: {
        format: 'HH:mm',
      },
      colProps: {
        xs: 24,
        md: 4,
      },
    },
    {
      dataIndex: 'name',
      valueType: 'text',
    },
    // 8
    {
      dataIndex: 'state',
      valueType: 'checkbox',
      valueEnum: {
        AT_MOST_ONCE: { text: '饮食品监管和留样' },
      },
      colProps: {
        xs: 24,
        md: 12,
      },
    },
   
    {
      dataIndex: 'name',
      valueType: 'text',
    },
  ];

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    const selectedItem = Types.filter((item) => item.key === e.key);
    setFormValueType(selectedItem[0].label);
  };

  const handleMenuEqualClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    const selectedItem = Types.filter((item) => item.key === e.key);
    setFormValueTypeEqual(selectedItem[0].label);
  };

  const menuProps = {
    items: Types,
    onClick: handleMenuClick,
  };

  const menuPropsEqual = {
    items: TypesEqual,
    onClick: handleMenuEqualClick,
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const renderBottomBtns = useCallback(() => {
    return (
      <Space className={styles.bottomBtns}>
        <Button className={styles.bottomBtn} size="large">取消</Button>
        <Button className={styles.bottomBtn} type="primary" size="large">
          保存并完成
        </Button>
      </Space>
    );
  }, []);

  return (
    <PageContainer header={{ title: '' }}>
      <ProCard
        bordered
        style={{ marginBottom: 16, height: 80 }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <RangePicker
            size="large"
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={(value, dateString) => {
              console.log('Selected Time: ', value);
              console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
          />
          <Dropdown menu={menuProps}>
            <Button size="large" style={{ width: 120 }}>
              <Space>
                {formValueType}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown menu={menuPropsEqual}>
            <Button size="large" style={{ width: 120 }}>
              <Space>
                {formValueTypeEqual}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Search
            size="large"
            placeholder="请输入关键词搜索"
            allowClear
            onSearch={onSearch}
            style={{ width: 450 }}
          />
        </Space>
        <Space>
          <Button type="link" icon={<FullscreenOutlined />} />
          <Button type="link" icon={<DownloadOutlined />} />
        </Space>
      </ProCard>
      <div className={styles.container}>
        <ProTable<TableListItem, TableListPagination>
          // headerTitle="查询表格"

          actionRef={actionRef}
          scroll={{ x: 2000 }}
          className={styles.tabCard}
          rowKey="key"
          search={false}
          request={rule}
          columns={columns}
        />

        <div className={styles.rightContent}>
          <ProCard className={styles.tabsCard} bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
            <Tabs
              className={styles.tabs}
              defaultActiveKey="2"
              items={TabsItems.map((item) => {
                const { label, key, Icon } = item;
                return {
                  key,
                  label,
                  children: null,
                  icon: Icon,
                };
              })}
            />
          </ProCard>

          <CardView style={{ marginBottom: 10 }} title={'任务信息'}>
            <ProDescriptions
              request={async () => {
                return Promise.resolve({
                  success: true,
                  data: {
                    date: '20200809',
                    money: '1212100',
                    money2: -12345.33,
                    state: 'all',
                    switch: true,
                    state2: 'open',
                  },
                });
              }}
              emptyText={'空'}
              column={{ xs: 2, sm: 3, md: 4 }}
              columns={[
                {
                  title: '任务编号',
                  key: 'text',
                  dataIndex: 'id',
                },
                {
                  title: '航班类型',
                  key: 'state',
                  dataIndex: 'state',
                  valueType: 'select',
                  valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    open: {
                      text: '未解决',
                      status: 'Error',
                    },
                    closed: {
                      text: '已解决',
                      status: 'Success',
                    },
                  },
                },
                {
                  title: '抵离',
                  key: 'state2',
                  dataIndex: 'state2',
                },
                {
                  title: '任务状态',
                  key: 'date',
                  dataIndex: 'date',
                  valueType: 'date',
                },
                {
                  title: '任务名称',
                  key: 'date',
                  dataIndex: 'date',
                  valueType: 'date',
                  fieldProps: {
                    format: 'DD.MM.YYYY',
                  },
                },
                {
                  title: '航班班次',
                  key: 'switch',
                  dataIndex: 'switch',
                  valueType: 'switch',
                },
                {
                  title: '任务级别',
                  key: 'money',
                  dataIndex: 'money',
                  valueType: 'money',
                  fieldProps: {
                    moneySymbol: '$',
                  },
                },
                {
                  title: '来电单位',
                  key: 'money',
                  dataIndex: 'money',
                  valueType: 'money',
                  fieldProps: {
                    moneySymbol: false,
                  },
                },
                {
                  title: '任务时间',
                  key: 'money2',
                  dataIndex: 'money2',
                  valueType: 'money',
                  fieldProps: {
                    moneySymbol: false,
                  },
                },
                {
                  title: '中外',
                  key: 'state2',
                  dataIndex: 'state2',
                },
                {
                  title: '任务地点',
                  key: 'state2',
                  dataIndex: 'state2',
                },
                {
                  title: '来电人',
                  key: 'state2',
                  dataIndex: 'state2',
                },
                {
                  title: '接电人',
                  key: 'state2',
                  dataIndex: 'state2',
                },
                {
                  title: '接电单位',
                  key: 'state2',
                  dataIndex: 'state2',
                },
              ]}
            />
          </CardView>

          <CardView title={'任务执行人员'}>
            <BetaSchemaForm
              layoutType={'Form'}
              submitter={false}
              layout="horizontal"
              formRef={formRef}
              rowProps={{
                gutter: [16, 0],
              }}
              colProps={{
                span: 12,
              }}
              grid
              onFinish={async (values) => {
                console.log(values);
              }}
              columns={columnsExecution as any}
            />
          </CardView>
        </div>

        {renderBottomBtns()}
      </div>
    </PageContainer>
  );
};

export default TableList;
