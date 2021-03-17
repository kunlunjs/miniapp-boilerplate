/* eslint-disable */
import { Apis } from './yapi.api'

export const apis: Apis = {
  'articles@/articles': {
    u: '/articles',
    m: 'GET',
    q: ['ordering', 'category_id', 'is_mandatory', 'page', 'page_size'],
    d: 0,
  },
}
