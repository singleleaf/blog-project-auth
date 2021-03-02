'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.get('/index', controller.home.index);

  // 正常路由
  router.post('/register', controller.auth.register);
  router.post('/login', controller.auth.login);

  // // 只有在需要验证 token 的路由上添加jwt
  // 新增文章
  // 创建或更新文章，如果有文章id就更新文章，否则新建文章
  router.post('/createArticle', jwt, controller.admin.createArticle);
  // 删除
  router.post('/delArticle', jwt, controller.admin.delArticle);
  // 批量删除
  router.post('/delArticleBatch', jwt, controller.admin.delArticleBatch);
  // 恢复文章
  router.post('/recoveryArticle', jwt, controller.admin.recoveryArticle);
  // 批量恢复文章
  router.post('/recoveryArticleBatch', jwt, controller.admin.recoveryArticleBatch);

  // 获取文章列表
  router.get('/getArticleList', jwt, controller.admin.getArticleList);
  // 编辑文章页获取用户的标签和分类列表
  router.get('/getArticleOptions', jwt, controller.admin.getArticleOptions);

  //---------------
  // 创建分类
  router.post('/createCategory', jwt, controller.admin.createCategory);
  // 获取分类列表
  router.get('/getCategoryList', jwt, controller.admin.getCategoryList);
  // 修改分类信息
  router.post('/modifyCategory', jwt, controller.admin.modifyCategory);
  // 删除分类，如果提交一个id字符串，删除该分类；如果提交一个分类的数组，则删除该数组匹配的所有分类
  router.post('/delCategory', jwt, controller.admin.delCategory);

  //---------------
  // 创建标签
  router.post('/createTag', jwt, controller.admin.createTag);
  // 获取标签列表
  router.get('/getTagList', jwt, controller.admin.getTagList);
  // 修改标签信息
  router.post('/modifyTag', jwt, controller.admin.modifyTag);
  // 删除标签，如果提交一个id字符串，删除该标签；如果提交一个标签的数组，则删除该数组匹配的所有标签
  router.post('/delTag', jwt, controller.admin.delTag);
  /* 前台路由 */
  // 获取所有文章列表，如果有传keyword,则根据keyword搜索
  router.get('/c/getArticleList', controller.client.getArticleList);
  // 根据分类搜索
  router.get('/c/searchByCategory', controller.client.searchByCategory);
  // 根据标签搜索
  router.get('/c/searchByTag', controller.client.searchByTag);
  // 获取文章的详细信息
  router.post('/c/getArticleDetail', controller.client.getArticleDetail);
  // 获取所有分类和标签及其数量
  router.get('/c/getTagsAndCategories', controller.client.getTagsAndCategories);
};
