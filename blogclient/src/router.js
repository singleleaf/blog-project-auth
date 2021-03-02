import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/layout/Index'
// import ArticleList from '@/views/article/ArticleList'
// import CategoryTag from '@/views/categorytag/CategoryTag'
// import AboutBlog from '@/views/aboutblog/AboutBlog'
// import AboutMe from '@/views/aboutme/AboutMe'

Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        // redirect: '/article',
        name: 'index',
        component: Index,
        meta:{
            title:'所有文章'
        },
          /**
       * @param type 0 为 关键字搜索， 1 为 分类搜索， 2 为标签搜索
       * @param condition 搜索的关键字 或者 分类/标签的id
       * **/
        children: [
            // {
            //     path: '/SearchList/:type/:condition?',
            //     name: 'searchlist',
            //     meta: {
            //         title: '搜索列表'
            //     },
            //     component: () =>
            //         import ('@/views/searchlist/SearchList.vue')

            // }

        ]


    },
    {
                path: '/SearchList/:type/:condition?',
                name: 'searchlist',
                meta: {
                    title: ''
                },
                component: () =>
                    import ('@/views/searchlist/SearchList.vue')

            },
     {
                path: '/CategoryTag',
                name: 'category',
                meta: {
                    title: '分类/标签'
                },
                component: () =>
                    import ('@/views/categorytag/CategoryTag.vue')

            }, {
                path: '/Blog',
                name: 'blog',
                meta: {
                    title: '关于博客'
                },
                component: () =>
                    import ('@/views/aboutblog/AboutBlog.vue')

            }, {
                path: '/AboutMe',
                name: 'aboutme',
                meta: {
                    title: '关于我'
                },
                component: () =>
                    import ('@/views/aboutme/AboutMe.vue')

            },
             {
                 /**
       * @param id 文章id
       * **/
      path: '/ArticleDetail/:id',
      name: 'articledetail',
       meta: {
                    title: ''
        },
        component: () =>
                    import ('@/views/articledetail/ArticleDetail.vue')


            }
            ]
})