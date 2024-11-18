import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Avatar, List, Skeleton, Statistic } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { FC } from 'react';
import type { ActivitiesType, CurrentUser } from './data.d';
import { fakeChartData, queryActivities, queryProjectNotice } from './service';
import useStyles from './style.style';
dayjs.extend(relativeTime);

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];
const PageHeaderContent: FC<{
  currentUser: Partial<CurrentUser>;
}> = ({ currentUser }) => {
  const { styles } = useStyles();
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};
const ExtraContent: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="团队内排名" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="项目访问" value={2223} />
      </div>
    </div>
  );
};
const Workplace: FC = () => {
  const { styles } = useStyles();
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  const { data } = useRequest(fakeChartData);
  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key as keyof ActivitiesType]) {
        const value = item[key as 'user'];
        return (
          <a href={value?.link} key={value?.name}>
            {value.name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {dayjs(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer title=" ">
      <div className="flex justify-around mb-20">
        <img
          style={{ width: '46%', objectFit: 'contain' }}
          src={require('../../../public/images/home/left.png')}
        />
        <img
          style={{ width: '26%', objectFit: 'contain' }}
          src={require('../../../public/images/home/right.png')}
        />
      </div>
      <div className="flex-col  justify-items-center bg-gray-200 p-8">
        <div className="text-lg font-semibold mb-8 font-mono">Introduction</div>
        <div className="text-base font-mono text-justify">
          Up to now, growing studies have focused on explaining the growth and development of plants
          at the level of single cells, and at the same time, numerous of single-cell data sets have
          been generated. In order to understand the composition of cells, marker genes are widely
          used in single-cell datasets to distinguish different cell types. At the same time,
          related plant marker gene databases have also been developed by researchers, but they
          simply collected and listed the data about plant marker genes, and did not show their
          transcription levels in the corresponding tissues in detail. Now we have developed a
          marker gene database for plant reproductive organs, with the aim of showing the expression
          of marker genes in plant reproductive organs in detail from a multi-omics perspective and
          providing researchers with a comprehensive insight.
        </div>
      </div>
    </PageContainer>
  );
};
export default Workplace;
