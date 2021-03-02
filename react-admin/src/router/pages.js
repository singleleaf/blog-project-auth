// pages>index.js
import Loadable from 'react-loadable'
// import Loading from './my-loading-component';
// 意思是在加载的时候 显示 都加载组件没有组件的时候 我们可以写为
const Loading = () => null // 加载时不现实loading

const Login = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loading
})

const BlogList = Loadable({
  loader: () => import('../pages/blogList'),
  loading: Loading
})
const ListDetail = Loadable({
  loader: () => import('../pages/listDetail'),
  loading: Loading
})
const TagList = Loadable({
  loader: () => import('../pages/tagList'),
  loading: Loading
})
const CategoryList = Loadable({
  loader: () => import('../pages/categoryList'),
  loading: Loading
})

export { Login, BlogList, ListDetail, TagList, CategoryList } // 将页面导出
