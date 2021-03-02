import { Login, BlogList, ListDetail, CategoryList, TagList } from './pages'

const routes = [
  {
    path: '/login',
    component: Login
  },

  {
    path: '/blogList',
    component: BlogList
  },
  {
    path: '/listDetail',
    component: ListDetail
  },
  {
    path: '/tagList',
    component: TagList
  },
  {
    path: '/categoryList',
    component: CategoryList
  }
]
export default routes
