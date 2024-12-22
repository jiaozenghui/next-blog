export interface menuProps {
  id: string
  label: string
  external?: boolean
  children?: tagProps[]
}

export const menuConfs = {
  search: '搜索',
  all: '最新发布',
  personal: '关于我',
  chart: '图表',
  screen: '大屏',
  technology: 'IT技术',
  life: '生活'
}

export type pTypes = keyof typeof menuConfs

export interface tagProps {
  id: string
  label: string
}


export const tagList = [
  {
    id: 'js',
    label: 'JS'
  },
  {
    id: 'nodejs',
    label: 'Nodejs'
  },
  {
    id: 'angular',
    label: 'Agular'
  },
  {
    id: 'vue',
    label: 'Vue'
  },
  {
    id: 'react',
    label: 'React'
  },
  {
    id: 'webpack',
    label: 'Webpack'
  },
  {
    id: 'mongodb',
    label: 'Mongodb'
  }
]

export const categoryList = [
  {
    id: 'life',
    label: '生活'
  },
  {
    id: 'technology',
    label: 'IT技术',
    children: tagList
  },
  {
    id: 'screen',
    label: '大屏'
  },
  {
    id: 'chart',
    label: '图表'
  }
]

export const menuList: menuProps[] = [
  {
    id: 'life',
    label: '生活'
  },
  {
    id: 'technology',
    label: 'IT技术',
    children: tagList
  },
  {
    id: 'http://111.229.109.174:8086/#/screens/list',
    label: '大屏',
    external: true
  },
  {
    id: 'http://111.229.109.174:8086/#/statistic-analysis/customize',
    label: '图表',
    external: true
  },
  {
    id: '/about/index.html',
    label: '关于我',
    external: true
  }
]

export const userMessageConfs: { [key: number]: string } = {
  101001: '输入信息验证失败',
  101005: '请勿频繁获取短信验证码',
  101006: '验证码不正确',
  101007: '验证码发送失败'
}
