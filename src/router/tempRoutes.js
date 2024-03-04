import Layout from '@/layout';

export const tempRoutes = [
  {
    path: '/table-demo',
    component: Layout,
    meta: { title: '表格Demo', icon: 'setting', affix: true },
    children: [
      {
        path: '',
        component: () => import('@/views/table-demo.vue'),
        name: 'TableDemo',
        meta: { title: '表格Demo', affix: true },
      },
    ],
  },
];
