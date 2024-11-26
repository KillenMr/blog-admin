import { removeRule, rule } from '@/services/ant-design-pro/api';
import { getGenesList } from '@/services/blogApi';
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

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

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

  // const { data: genesList, loading: genesLogin } = useRequest(getGenesList);

  const columns: ProColumns<any>[] = [
    {
      title: 'Species',
      dataIndex: 'species_type',
      //   hideInSearch: true,
    },
    {
      title: 'Cell Marker Name',
      dataIndex: 'cell_marker_name',
      // hideInSearch: true,
    },
    {
      title: 'gene symbol',
      dataIndex: 'gene_symbol',
      // hideInSearch: true,
    },

    {
      title: 'gene aliases',
      dataIndex: 'gene_aliases',
      hideInSearch: true,
    },
    {
      title: 'gene description',
      dataIndex: 'gene_description',
      hideInSearch: true,
    },
    {
      title: 'Gene ID',
      dataIndex: 'gene_id',
      hideInSearch: true,
    },
    {
      title: 'Gene Type',
      dataIndex: 'gene_type',
      hideInSearch: true,
    },
    {
      title: 'NCBI Gene Id',
      dataIndex: 'gene_type',
      hideInSearch: true,
    },
    {
      title: 'source',
      dataIndex: 'source',
      hideInSearch: true,
    },
    {
      title: 'PMID_E',
      dataIndex: 'PMID_E',
      hideInSearch: true,
    },
    // {
    //   title: '操作',
    //   fixed: 'right',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   width: 50,
    //   render: (_, record) => [
    //     <a key="subscribeAlert" href="https://procomponents.ant.design/">
    //       删除
    //     </a>,
    //   ],
    // },
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
      <ProTable
        headerTitle={''}
        scroll={{ x: 1600 }}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        // toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: {
            pageSize: number;
            current: number;
          },
          sort,
          filter,
        ) => {
          console.log('params >>>', params);
          const { current, pageSize, gene_symbol, cell_marker_name, species_type } = params || {};
          let queryParams: any = {
            'pagination[page]': current,
            'pagination[pageSize]': pageSize,
          };
          if (gene_symbol) queryParams['filters[gene_symbol][$eq]'] = gene_symbol;
          if (cell_marker_name) queryParams['filters[cell_marker_name][$eq]'] = cell_marker_name;
          if (species_type) queryParams['filters[species_type][$eq]'] = species_type;
          const msg = await getGenesList(queryParams);
          console.log('mesg >>>', msg);
          return {
            data: msg.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: msg.meta.pagination.total,
          };
        }}
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
