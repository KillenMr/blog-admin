import { request } from '@umijs/max';
import type { ActivitiesType, AnalysisData, NoticeType } from './data';

export async function queryProjectNotice(): Promise<{ data: NoticeType[] }> {
  return {
    data: [
      {
        id: 'xxx1',
        title: '小麦基因组测序',
        logo: 'https://example.com/wheat_genome.png',
        description: '揭示小麦的基因奥秘，推动农业创新',
        updatedAt: '2024-10-17T03:31:25.822Z',
        member: '农业科学研究组',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx2',
        title: '抗旱基因研究',
        logo: 'https://example.com/drought_resistance.png',
        description: '培育抗旱作物，为未来农业提供保障',
        updatedAt: '2017-07-24T00:00:00.000Z',
        member: '植物遗传学专家团队',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx3',
        title: '作物基因编辑',
        logo: 'https://example.com/gene_editing.png',
        description: '利用 CRISPR 改良作物，提高产量和质量',
        updatedAt: '2024-10-17T03:31:25.822Z',
        member: '精准育种联盟',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx4',
        title: '小麦产量改良',
        logo: 'https://example.com/wheat_yield.png',
        description: '优化小麦基因，提高粮食生产效率',
        updatedAt: '2017-07-23T00:00:00.000Z',
        member: '粮食安全创新团队',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx5',
        title: '植物病害抗性基因',
        logo: 'https://example.com/disease_resistance.png',
        description: '发现抗病基因，保护作物健康生长',
        updatedAt: '2017-07-23T00:00:00.000Z',
        member: '农作物病害防控小组',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx6',
        title: '基因多样性与育种',
        logo: 'https://example.com/genetic_diversity.png',
        description: '挖掘遗传多样性，推动农业可持续发展',
        updatedAt: '2017-07-23T00:00:00.000Z',
        member: '绿色农业开发团队',
        href: '',
        memberLink: '',
      },
    ],
  };
  // return request('/api/project/notice');
}

export async function queryActivities(): Promise<{ data: ActivitiesType[] }> {
  return request('/api/activities');
}

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/fake_workplace_chart_data');
}
