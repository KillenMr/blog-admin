import { InfoCircleOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Badge, Card, Descriptions, Divider, Empty, Table, Tooltip } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';
import type { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';
import useStyles from './style.style';

const operationTabList = [
  { key: 'tab1', tab: '基因编辑记录' },
  { key: 'tab2', tab: '序列分析日志' },
  { key: 'tab3', tab: '突变实验记录' },
];

const columns = [
  { title: '操作类型', dataIndex: 'type', key: 'type' },
  { title: '操作人', dataIndex: 'name', key: 'name' },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="失败" />
      ),
  },
  { title: '操作时间', dataIndex: 'updatedAt', key: 'updatedAt' },
  { title: '备注', dataIndex: 'memo', key: 'memo' },
];

type AdvancedState = {
  operationKey: 'tab1' | 'tab2' | 'tab3';
  tabActiveKey: string;
};

const Advanced: FC = () => {
  const { styles } = useStyles();

  const [tabStatus, setTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

  const { data = {}, loading } = useRequest<{
    data: AdvancedProfileData;
  }>(queryAdvancedProfile);

  const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;

  const contentList = {
    tab1: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={columns}
      />
    ),
    tab2: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={columns}
      />
    ),
    tab3: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={columns}
      />
    ),
  };

  return (
    <PageContainer title=" " className={styles.pageHeader}>
      <div className={styles.main}>
        <GridContent>
          <Card title="Home" style={{ marginBottom: 24 }} bordered={false}>
            The home page provides a global view of tissue maps of six plants to quickly explore
            cell markers by clicking on hyperlinks embedded in the web images. The tissue map for
            different plants can be switched by clicking the picture at the top right. The tissue
            maps can facilitate quick browse of cell markers for the listed cell types and more
            detailed cell types can be shown by clicking the tissue icons. Meanwhile, user can
            select source (All, Experimental, Bulk RNA-seq and seRNA-seq) for marker genes in the
            top panel. When click a cell type (for example: root cap), it will jump to the
            corresponding search result of the cell markers related to the cell type.
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default Advanced;
