// demo

const bankRouter = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo'),
    meta: { title: 'demo' }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list'),
    meta: { title: 'list' }
  },
  {
    path: '/list/add',
    name: 'listAdd',
    component: () => import('@/views/list/add'),
    meta: { title: 'listAdd' }
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import('@/views/userCenter'),
    meta: { title: '用户' }
  }
]

export default bankRouter
