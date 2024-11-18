import { request } from '@umijs/max';

export async function getOrgList(params: any) {
  return request('/api/currentUser', {
    method: 'GET',
    params,
  });
}
