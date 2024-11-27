import { ArrowDownOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'FileName',
      dataIndex: 'fileName',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '下载',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Button title="下载">
          <ArrowDownOutlined />
        </Button>
      ),
    },
  ];

  const dataSource = [
    {
      fileName: 'All cell markers',
      desc: 'All cell markers of different cell types from different tissues',
    },
    {
      fileName: 'Arabidopsis thalana',
      desc: 'Cell markers of different cell types from different tissues in Arabidopsis thaliana',
    },
    {
      fileName: 'Wheat',
      desc: 'Cell markers of different cell types from different tissues in Wheat',
    },
    {
      fileName: 'Rice',
      desc: 'Cell markers derived from single-cell sequencing researches in Rice',
    },
    {
      fileName: 'Brassica napus',
      desc: 'Cell markers of different cell types from different tissues in Brassica napus',
    },
    {
      fileName: 'Maize',
      desc: 'Cell markers of different cell types from different tissues in Maize',
    },
    {
      fileName: 'Nicotiana tabacum',
      desc: 'Cell markers of different cell types from different tissues in Nicotiana tabacum',
    },
    {
      fileName: 'Sorghum',
      desc: 'Cell markers of different cell types from different tissues in Sorghum',
    },
    {
      fileName: 'Tomato',
      desc: 'Cell markers of different cell types from different tissues in Tomato',
    },
    {
      fileName: 'Peanut',
      desc: 'Cell markers of different cell types from different tissues in Peanut',
    },
    {
      fileName: 'Glycine max',
      desc: 'Cell markers of different cell types from different tissues in Glycine max',
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={false}
        columns={columns}
        dataSource={dataSource}
      />
    </PageContainer>
  );
};

export default TableList;
