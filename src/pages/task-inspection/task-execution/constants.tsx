import { CheckOutlined, DiffOutlined, TeamOutlined } from '@ant-design/icons';
import { TypeItem } from './data';

export const Types: TypeItem[] = [
  {
    label: '全部',
    key: '1',
  },
  {
    label: '任务编码',
    key: '2',
  },
  {
    label: '主宾姓名',
    key: '3',
    danger: true,
  },
  {
    label: '到访时间',
    key: '4',
  },
  {
    label: '任务级别',
    key: '4',
  },
  {
    label: '任务地点',
    key: '4',
  },
  {
    label: '任务状态',
    key: '4',
  },
];

export const TypesEqual: TypeItem[] = [
  {
    label: '大于',
    key: '1',
  },
  {
    label: '等于',
    key: '2',
  },
  {
    label: '小于',
    key: '3',
    danger: true,
  },
  {
    label: '介于',
    key: '4',
  },
];

export const TabsItems: any[] = [
  {
    label: '岗位报备',
    Icon: <TeamOutlined />,
    key: 1,
  },
  {
    label: '信息核查',
    Icon: <CheckOutlined />,
    key: 2,
  },
  {
    label: '执行记录',
    Icon: <DiffOutlined />,
    key: 3,
  },
];
