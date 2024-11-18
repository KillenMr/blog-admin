import { CloseCircleOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Card, Col, message, Popover, Row } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { fakeSubmitForm } from './service';
import useStyles from './style.style';

interface TableFormDateType {
  key: string;
  geneId?: string;
  geneName?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}

type InternalNamePath = (string | number)[];
const fieldLabels = {
  name: '基因库名称',
  url: '基因库地址',
  owner: '项目负责人',
  approver: '审核专家',
  dateRange: '项目周期',
  type: '研究类型',
  name2: '实验任务',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任专家',
  dateRange2: '提醒时间',
  type2: '样本类型',
};

const tableData = [
  {
    key: '1',
    geneId: 'G001',
    geneName: 'Bt基因',
    department: '基因工程研究所',
  },
  {
    key: '2',
    geneId: 'G002',
    geneName: '耐盐基因',
    department: '农作物改良实验室',
  },
  {
    key: '3',
    geneId: 'G003',
    geneName: '抗病基因',
    department: '植物病理研究中心',
  },
];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [error, setError] = useState<ErrorField[]>([]);

  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as keyof typeof fieldLabels;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });

    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => trigger.parentNode as HTMLElement}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '基因名称',
      dataIndex: 'geneName',
      key: 'geneName',
      width: '20%',
    },
    {
      title: '基因编号',
      dataIndex: 'geneId',
      key: 'geneId',
      width: '20%',
    },
    {
      title: '所属研究部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record) => (
        <a key="edit" onClick={() => record.editable && alert('编辑')}>
          编辑
        </a>
      ),
    },
  ];

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (props, dom) => (
          <FooterToolbar>
            {getErrorInfo(error)}
            {dom}
          </FooterToolbar>
        ),
      }}
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="此表单用于农业基因研究项目的数据管理。">
        <Card title="基因库信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name}
                name="name"
                rules={[{ required: true, message: '请输入基因库名称' }]}
                placeholder="请输入基因库名称"
              />
            </Col>
            <Col lg={8} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.url}
                name="url"
                rules={[{ required: true, message: '请输入基因库地址' }]}
                fieldProps={{ addonBefore: 'http://', addonAfter: '.org' }}
                placeholder="请输入基因库地址"
              />
            </Col>
            <Col lg={10} md={24} sm={24}>
              <ProFormSelect
                label={fieldLabels.owner}
                name="owner"
                rules={[{ required: true, message: '请选择负责人' }]}
                options={[
                  { label: '李四', value: 'li' },
                  { label: '张三', value: 'zhang' },
                ]}
                placeholder="请选择负责人"
              />
            </Col>
          </Row>
        </Card>

        <Card title="任务管理" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name2}
                name="name2"
                rules={[{ required: true, message: '请输入任务名' }]}
                placeholder="任务名"
              />
            </Col>
            <Col lg={8} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.url2}
                name="url2"
                rules={[{ required: true, message: '请输入任务描述' }]}
                placeholder="任务描述"
              />
            </Col>
            <Col lg={10} md={24} sm={24}>
              <ProFormSelect
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{ required: true, message: '请选择执行人' }]}
                options={[
                  { label: '王五', value: 'wang' },
                  { label: '赵六', value: 'zhao' },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
