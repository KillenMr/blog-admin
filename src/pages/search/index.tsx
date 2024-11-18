import { removeRule, rule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const [messageApi, contextHolder] = message.useMessage();

  const { run: delRun, loading } = useRequest(removeRule, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();

      messageApi.success('Deleted successfully and will refresh soon');
    },
    onError: () => {
      messageApi.error('Delete failed, please try again');
    },
  });

  const columns: ProColumns<any>[] = [
    {
      title: 'species_type',
      dataIndex: 'species_type',
      hideInSearch: true,
    },
    {
      title: 'first',
      dataIndex: 'first',
      // hideInSearch: true,
    },
    {
      title: 'second',
      dataIndex: 'second',
      // hideInSearch: true,
    },
    {
      title: 'third',
      dataIndex: 'third',
      // hideInSearch: true,
    },
    {
      title: 'Cell_marker_name',
      dataIndex: 'Cell_marker_name',
      hideInSearch: true,
    },
    {
      title: 'Gene_symbol',
      dataIndex: 'Gene_symbol',
      hideInSearch: true,
    },
    {
      title: 'Gene_id',
      dataIndex: 'Gene_id',
    },
    {
      title: 'Gene_id_rap',
      dataIndex: 'Gene_id_rap',
      hideInSearch: true,
    },
    {
      title: 'Protein_name',
      dataIndex: 'Protein_name',
      hideInSearch: true,
    },
    {
      title: 'Protein_id',
      dataIndex: 'Protein_id',
      hideInSearch: true,
    },
    {
      title: 'Marker_resource',
      dataIndex: 'Marker_resource',
      hideInSearch: true,
    },
    {
      title: 'Note_gene_type',
      dataIndex: 'Note_gene_type',
      hideInSearch: true,
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 50,
      render: (_, record) => [
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          删除
        </a>,
      ],
    },
  ];

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.RuleListItem[]) => {
      if (!selectedRows?.length) {
        messageApi.warning('请选择删除项');

        return;
      }

      await delRun({
        data: {
          key: selectedRows.map((row) => row.key),
        },
      });
    },
    [delRun],
  );

  return (
    <PageContainer title={' '}>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'组织数据列表'}
        scroll={{ x: 1600 }}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
