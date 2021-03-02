/* eslint-disable jsdoc/check-param-names */
'use strict';

const Service = require('egg').Service;
class BlogService extends Service {
  // 获取文章列表
  async getAllArticleById(page, keyword, status) {
    const { ctx } = this;
    const reg = new RegExp(keyword, 'i');
    const [list, count] = await Promise.all([
      ctx.model.Article.find(
        {
          status: 0,
          $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
        },
        {
          html: 0,
        }
      )
        .populate([
          { path: 'tagId', select: 'tagName' },
          { path: 'categoryId', select: 'categoryName' },
        ])
        .limit(8)
        .skip((page - 1) * 8),
      ctx.model.Article.find({
        status: 0,
        $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
      }).count(),
      // find()第一个{} 放where条件 第二个{} 指定那些列显示和不显示 （0表示不显示 1表示显示)
    ]);
    // 截出预览部分
    list.map((item) => {
      item.content = item.content.split('<!-- more -->')[0];
      return item;
    });
    return {
      list,
      count,
    };
  }

  // 获取文章分类列表
  async searchByCategory(page, id) {
    const { ctx } = this;
    const [list, count] = await Promise.all([
      ctx.model.Article.find({ status: 0, categoryId: id }, { html: 0 })
        .populate([
          { path: 'tagId', select: 'tagName' },
          { path: 'categoryId', select: 'categoryName' },
        ])
        .limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, categoryId: id }, { html: 0 }).count(),
    ]);
    // 截出预览部分
    list.map((item) => {
      item.content = item.content.split('<!-- more -->')[0];
      return item;
    });
    return {
      list,
      count,
    };
  }

  // 获取文章标签列表
  async searchByTag(page, id) {
    const { ctx } = this;
    const [list, count] = await Promise.all([
      ctx.model.Article.find({ status: 0, tagId: id }, { html: 0 })
        .populate([
          { path: 'tagId', select: 'tagName' },
          { path: 'categoryId', select: 'categoryName' },
        ])
        .limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, tagId: id }, { html: 0 }).count(),
    ]);
    // 截出预览部分
    list.map((item) => {
      item.content = item.content.split('<!-- more -->')[0];
      return item;
    });
    return {
      list,
      count,
    };
  }
  // 根据id获取文章详情
  async getArticleDetailByArticleId(id) {
    const { ctx } = this;
    return await ctx.model.Article.find({ _id: id }, { html: 0 }).populate([
      { path: 'tagId', select: 'tagName' },
      { path: 'categoryId', select: 'categoryName' },
    ]);
  }
  // 获取分类及数量
  async getCategoriesCount() {
    const { ctx } = this;
    const categories = await ctx.model.Category.find({}, { __v: 0, userId: 0 });
    const res = [];
    for (let index = 0; index < categories.length; index++) {
      const item = categories[index];
      const count = await ctx.model.Article.find({
        status: 0,
        categoryId: item._id,
      }).count();
      res.push({
        count,
        categoryName: item.categoryName,
        categoryId: item._id,
      });
    }
    return res;
  }
  // 获取标签及数量
  async getTagsCount() {
    const { ctx } = this;
    const tags = await ctx.model.Tag.find({}, { __v: 0, userId: 0 });
    const res = [];
    for (let index = 0; index < tags.length; index++) {
      const item = tags[index];
      const count = await ctx.model.Article.find({
        status: 0,
        tagId: item._id,
      }).count();
      res.push({
        count,
        tagName: item.tagName,
        tagId: item._id,
      });
    }
    return res;
  }
}
module.exports = BlogService;
