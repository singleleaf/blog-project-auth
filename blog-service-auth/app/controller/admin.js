'use strict';
// app/controller/student.js

const Controller = require('egg').Controller;

class BlogController extends Controller {
  // 新增或者更新文章
  async createArticle() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    if (id) {
      await ctx.service.admin.updateArticle(id);
      ctx.returnBody(true, {}, ctx.request.body.status === 1 ? '章已存入草稿箱' : '文章修改成功');
    } else {
      await ctx.service.admin.createArticle();
      ctx.returnBody(true, {}, '文章发布成功');
    }
  }
  // 获取文章列表
  async getArticleList() {
    const { ctx } = this;
    const { page = 1, keyword = '', status = 0 } = ctx.query;
    const res = await ctx.service.admin.getArticleList(page, keyword, status);
    ctx.returnBody(true, res);
  }

  // 获取文章详情,以便编辑文章的时候使用
  async getArticleDetail() {
    const { ctx } = this;
    const id = ctx.request.body.id; // post请求
    const res = await ctx.service.admin.getArticleDetailByArticleId(id);
    ctx.returnBody(true, res);
  }
  // 删除文章
  async delArticle() {
    const { ctx } = this;
    const id = ctx.request.body.id; // post请求
    const res = await ctx.service.admin.delArticleById(id);
    ctx.returnBody(true, {}, res.n > 0 ? '文章删除成功' : '文章删除失败', res.n > 0 ? 200 : 500);
  }
  // 批量删除文章
  async delArticleBatch() {
    const { ctx } = this;
    const list = ctx.request.body.list;
    const res = await ctx.service.admin.delArticleBatch(list);
    ctx.returnBody(true, {}, res.n > 0 ? '文章删除成功' : '文章删除失败', res.n > 0 ? 200 : 500);
  }
  // 恢复文章
  async recoveryArticle() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const res = await ctx.service.admin.recoveryArticleById(id);
    ctx.returnBody(true, {}, res.n > 0 ? '文章恢复成功' : '文章恢复失败', res.n > 0 ? 200 : 500);
  }
  // 批量恢复文章
  async recoveryArticleBatch() {
    const { ctx } = this;
    const { list } = ctx.request.body;
    const res = await ctx.service.admin.recoveryArticleBatch(list);
    ctx.returnBody(true, {}, res.n > 0 ? '文章恢复成功' : '文章恢复失败', res.n > 0 ? 200 : 500);
  }

  // 获取标签和分类
  async getArticleOptions() {
    const { ctx } = this;
    const user = await ctx.getUserData();
    const categoryList = await ctx.service.admin.getCategoryListById(user._id);
    const tagList = await ctx.service.admin.getTagsListById(user._id);
    ctx.returnBody(true, { categoryList, tagList });
  }
  //------------------------------
  // 创建分类
  async createCategory() {
    const { ctx } = this;
    const { categoryName } = ctx.request.body;
    const isNew = await ctx.service.admin.checkDuplicateCategory(categoryName);
    if (!isNew) {
      ctx.returnBody(true, {}, '该分类已经存在', 203);
    } else {
      const res = await ctx.service.admin.createCategory(categoryName);
      if (!res._id) {
        ctx.returnBody(true, {}, '分类新增失败', 202);
      } else {
        ctx.returnBody(true, {}, '分类新增成功');
      }
    }
  }

  // 分类列表页获取分类列表
  async getCategoryList() {
    const { ctx } = this;
    const page = ctx.query.page;
    const user = await ctx.getUserData();
    const res = await ctx.service.admin.getCategoryList(user._id, page);
    ctx.returnBody(true, { ...res });
  }
  // 修改分类信息
  async modifyCategory() {
    const { ctx } = this;
    const { id, categoryName } = ctx.request.body;
    const res = await ctx.service.admin.modifyCategory(id, categoryName);

    ctx.returnBody(true, {}, res.n === 0 ? '该分类id不存在' : '修改成功', res.n === 0 ? 500 : 200);
  }
  // 删除分类
  async delCategory() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    let res = '';
    if (typeof id === 'string') {
      res = await ctx.service.admin.delCategory(id);
    } else if (id instanceof Array) {
      res = await ctx.service.admin.delCategoryBatch(id);
    }

    ctx.returnBody(true, { res }, res.n > 0 ? '删除成功' : '删除失败', res.n > 0 ? 200 : 500);
  }

  //------------------------------
  // 创建标签
  async createTag() {
    const { ctx } = this;
    const { tagName } = ctx.request.body;
    const isNew = await ctx.service.admin.checkDuplicateTag(tagName);
    if (!isNew) {
      ctx.returnBody(true, {}, '该标签已经存在', 203);
    } else {
      const res = await ctx.service.admin.createTag(tagName);
      if (!res._id) {
        ctx.returnBody(true, {}, '标签新增失败', 202);
      } else {
        ctx.returnBody(true, {}, '标签新增成功');
      }
    }
  }

  // 分类列表页获取分类列表
  async getTagList() {
    const { ctx } = this;
    const page = ctx.query.page;
    const user = await ctx.getUserData();
    const res = await ctx.service.admin.getTagList(user._id, page);
    ctx.returnBody(true, { ...res });
  }
  // 修改分类信息
  async modifyTag() {
    const { ctx } = this;
    const { id, tagName } = ctx.request.body;
    const res = await ctx.service.admin.modifyTag(id, tagName);
    ctx.returnBody(true, {}, res.n === 0 ? '该标签id不存在' : '修改成功', res.n === 0 ? 500 : 200);
  }
  // 删除标签
  async delTag() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    let res = '';
    if (typeof id === 'string') {
      res = await ctx.service.admin.delTag(id);
    } else if (id instanceof Array) {
      res = await ctx.service.admin.delTagBatch(id);
    }
    ctx.returnBody(true, { res }, res.n > 0 ? '删除成功' : '删除失败', res.n > 0 ? 200 : 500);
  }
}

module.exports = BlogController;
