'use strict';
const Controller = require('egg').Controller;
class BlogController extends Controller {
  /**
   * 获取文章列表
   * 如果没传keyword，返回所有文章
   * 传入keywork返回根据keyword在标题和内容搜索的结果
   */
  async getArticleList() {
    const { ctx } = this;
    const { page = 1, keyword = '' } = ctx.query;
    const articleList = await ctx.service.client.getAllArticleById(page, keyword);
    ctx.returnBody(true, { list: articleList.list, count: articleList.count }, '操作成功');
  }
  /**
   * 根据分类id查询文章
   */
  async searchByCategory() {
    const { ctx } = this;
    const { page = 1, id = '' } = ctx.query;
    const articleList = await ctx.service.client.searchByCategory(page, id);
    ctx.returnBody(true, { list: articleList.list, count: articleList.count }, '操作成功');
  }
  /**
   * 根据标签id查询文章
   */
  async searchByTag() {
    const { ctx } = this;
    const { page = 1, id = '' } = ctx.query;

    const articleList = await ctx.service.client.searchByTag(page, id);
    ctx.returnBody(true, { list: articleList.list, count: articleList.count }, '操作成功');
  }
  /**
   * 根据文章id查询文章内容
   */
  async getArticleDetail() {
    const { ctx } = this;
    const articleId = ctx.request.body.id;
    const articleDetail = await ctx.service.client.getArticleDetailByArticleId(articleId);
    ctx.returnBody(true, { data: articleDetail[0] }, '操作成功');
  }
  /**
   * 获取所有分类和标签及其数量
   */
  async getTagsAndCategories() {
    const { ctx } = this;

    const [categoriesCount, tagsCount] = await Promise.all([
      ctx.service.client.getCategoriesCount(),
      ctx.service.client.getTagsCount(),
    ]);

    ctx.returnBody(true, { categoriesCount, tagsCount }, '操作成功');
  }
}

module.exports = BlogController;
