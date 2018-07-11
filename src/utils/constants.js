export const API_ROOT = 'https://test-miniprogram.com/api';

export const API_NEWS_LIST = `${API_ROOT}/news/list`;
export const API_NEWS_DETAIL = `${API_ROOT}/news/detail`;

export const DEFAULT_CATEGORY = 'gn';

export const CATEGORY_MAPPING = [
  {
    key: 'gn',
    value: '国内',
    selected: true
  },
  {
    key: 'gj',
    value: '国际',
    selected: false
  },
  {
    key: 'cj',
    value: '财经',
    selected: false
  },
  {
    key: 'yl',
    value: '娱乐',
    selected: false
  },
  {
    key: 'js',
    value: '军事',
    selected: false
  },
  {
    key: 'ty',
    value: '体验',
    selected: false
  },
  {
    key: 'other',
    value: '其他',
    selected: false
  }
];