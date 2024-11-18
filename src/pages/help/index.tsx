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

  const onOperationTabChange = (key: string) => {
    setTabStatus({ ...tabStatus, operationKey: key as 'tab1' });
  };

  return (
    <PageContainer title=" " className={styles.pageHeader}>
      <div className={styles.main}>
        <GridContent>
          <Card title="作物基因信息" style={{ marginBottom: 24 }} bordered={false}>
            <Descriptions style={{ marginBottom: 24 }}>
              <Descriptions.Item label="作物名称">水稻 (Oryza sativa)</Descriptions.Item>
              <Descriptions.Item label="基因编号">LOC_Os01g01010</Descriptions.Item>
              <Descriptions.Item label="研究负责人">张三</Descriptions.Item>
              <Descriptions.Item label="实验室位置">浙江省农业基因研究所</Descriptions.Item>
              <Descriptions.Item label="样本描述">
                水稻基因 LOC_Os01g01010 与抗旱性相关，属于 NAC 基因家族。
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="实验信息" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="实验类型">CRISPR 基因编辑</Descriptions.Item>
              <Descriptions.Item label="最新更新">2024-10-17</Descriptions.Item>
              <Descriptions.Item
                label={
                  <span>
                    编辑工具
                    <Tooltip title="常用的 CRISPR/Cas9 编辑技术">
                      <InfoCircleOutlined style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }} />
                    </Tooltip>
                  </span>
                }
              >
                CRISPR/Cas9
              </Descriptions.Item>
            </Descriptions>

            <h4 style={{ marginBottom: 16 }}>多层级信息组</h4>
            <Card type="inner" title="基因组详情">
              <Descriptions style={{ marginBottom: 16 }} title="信息组">
                <Descriptions.Item label="染色体位置">Chr01: 100-200kb</Descriptions.Item>
                <Descriptions.Item label="表达水平">高</Descriptions.Item>
                <Descriptions.Item label="功能注释">
                  该基因编码 NAC 转录因子，在逆境胁迫中发挥关键作用。
                </Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: '16px 0' }} />
              <Descriptions title="其他信息" column={1}>
                <Descriptions.Item label="物种">
                  Oryza sativa subsp. indica (籼稻)
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Card>

          <Card title="近半年样本采集记录" style={{ marginBottom: 24 }} bordered={false}>
            <Empty />
          </Card>

          <Card bordered={false} tabList={operationTabList} onTabChange={onOperationTabChange}>
            {contentList[tabStatus.operationKey] as React.ReactNode}
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default Advanced;
