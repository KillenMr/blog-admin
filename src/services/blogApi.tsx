import { request } from '@umijs/max';

export async function getGenesList(params: any) {
  return request('/api/Genes', {
    method: 'GET',
    params,
  });
}
