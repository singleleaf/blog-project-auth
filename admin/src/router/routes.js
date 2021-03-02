import Layout from '@/pages/layout/Index';
import Login from '@/pages/login/index';

const routes = [
  {
    path: '/',
    redirect: '/ArticleList',
    name: 'layout',
    component: Layout,
    meta: {
      title: '博客管理',
    },
    children: [
      {
        name: 'ArticleList',
        path: '/ArticleList',
        meta: {
          title: '博客操作',
        },
        component: () => import('@/pages/create/articlelist/Index.vue'),
      },
      {
        name: 'NewArticle',
        path: '/NewArticle',
        meta: {
          title: '创建文章',
        },
        component: () => import('@/pages/create/newarticle/NewArticle.vue'),
      },
      {
        name: 'NewCategory',
        path: '/NewCategory',
        meta: {
          title: '创建分类',
        },
        component: () => import('@/pages/create/newcategory/NewCategory.vue'),
      },
      {
        name: 'NewTag',
        path: '/NewTag',
        meta: {
          title: '创建标签',
        },
        component: () => import('@/pages/create/newtag/NewTag.vue'),
      },
      {
        name: 'EditArticle',
        path: '/EditArticle/:id',
        meta: {
          title: '编辑文章',
        },
        component: () => import('@/pages/create/editarticle/EditArticle.vue'),
      },
    ],
  },
  {
    path: '/manage',
    name: 'manage',
    component: Layout,
    meta: {
      title: '列表管理',
    },
    children: [
      {
        name: 'AllArticleList',
        path: '/AllArticleList',
        redirect: '/ArticleList',
        meta: {
          title: '所有博客列表',
        },
        component: () => import('@/pages/create/articlelist/Index.vue'),
      },
      {
        name: 'Draft',
        path: '/Draft',
        meta: {
          title: '草稿箱',
        },
        component: () => import('@/pages/create/articlelist/Draft.vue'),
      },
      {
        name: 'Garbage',
        path: '/Garbage',
        meta: {
          title: '垃圾箱',
        },
        component: () => import('@/pages/create/articlelist/Garbage.vue'),
      },
    ],
  },
  // 登陆
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '登陆',
      noNeedLogin: true,
    },
    component: () => import('@/pages/login/index.vue'),
  },
  // 404
  {
    path: '*',
    name: '404',
    meta: {
      title: '错误页面',
      noNeedLogin: true,
    },
    component: () => import('@/pages/404/index'),
  },
];
export default [...routes];
