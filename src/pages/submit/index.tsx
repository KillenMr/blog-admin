import { CloseCircleOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
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
      <PageContainer content="Welcome to submit new data to CellMarker. Please enter all of the information you have about the data to help us update. Once the submitted records approved by us, they will be public available in the coming release. Thank you for your contribution.">
        <Card title="Basis Information" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={'Species'}
                name="species"
                // rules={[{ required: true, message: '请选择负责人' }]}
                options={[
                  { label: 'human', value: 'human' },
                  { label: 'mouse', value: 'mouse' },
                ]}
                placeholder="请选择输入"
              />
              <ProFormText label={'Cell Type'} name="cellType" placeholder="请输入" />
              <ProFormText label={'E-mail'} name="email" placeholder="Your E-Mail" />
            </Col>
            <Col lg={8} md={12} sm={24}>
              <ProFormText
                label={'Cancer Type'}
                name="cancerType"
                // rules={[{ required: true, message: '' }]}
                // fieldProps={{ addonBefore: 'http://', addonAfter: '.org' }}
                placeholder="请输入"
              />
              <ProFormText
                label={'Source'}
                name="source"
                placeholder="Single-cell sequencing OR Experiment"
              />
            </Col>
            <Col lg={10} md={24} sm={24}>
              <ProFormText label={'Tissue Type'} name="tissueType" placeholder="请选择输入" />
              <ProFormText label={'Name'} name="name" placeholder="Your name" />
            </Col>
          </Row>
        </Card>

        <Card title="Paper Information" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={'PMID'}
                name="PMID"
                // rules={[{ required: true, message: '请输入任务名' }]}
                // placeholder="任务名"
              />
            </Col>
            <Col lg={8} md={12} sm={24}>
              <ProFormText
                label={'Journal'}
                name="Journal"
                // rules={[{ required: true, message: '请输入任务描述' }]}
                // placeholder="任务描述"
              />
            </Col>
            <Col lg={10} md={24} sm={24}>
              <ProFormText
                label={'Year'}
                name="Year"
                // rules={[{ required: true, message: '请输入任务描述' }]}
                // placeholder="任务描述"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={24} md={24} sm={24}>
              <ProFormTextArea
                name="Evidence"
                label="Evidence"
                // placeholder=""
                fieldProps={{ rows: 4 }}
              />
            </Col>
          </Row>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
