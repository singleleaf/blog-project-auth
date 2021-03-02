/* eslint-disable jsdoc/check-param-names */
'use strict';

const Service = require('egg').Service;
class BlogService extends Service {
  // 创建文章
  async createArticle() {
    const { ctx } = this;
    const user = await ctx.getUserData();
    const request = ctx.request.body;
    return await ctx.model.Article.create({
      userId: user._id,
      tagId: request.tagId,
      categoryId: request.categoryId || null,
      content: request.content,
      html: request.html,
      title: request.title,
      createTime: Date(),
      status: request.status,
    });
  }
  // 更新文章
  async updateArticle(id) {
    const { ctx } = this;
    const user = await ctx.getUserData();

    return ctx.model.Article.update(
      { _id: id },
      {
        userId: user._id,
        tagId: ctx.request.body.tagId,
        categoryId: ctx.request.body.categoryId || null,
        content: ctx.request.body.content,
        html: ctx.request.body.html,
        title: ctx.request.body.title,
        updateTime: Date(),
        status: ctx.request.body.status,
      }
    );
  }
  // 获取文章列表
  async getArticleList(page, keyword, status) {
    const { ctx } = this;
    const user = await ctx.getUserData();
    const reg = new RegExp(keyword, 'i');
    const [list, count] = await Promise.all([
      ctx.model.Article.find(
        {
          userId: user._id,
          status,
          $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
        },
        {
          content: 0,
        }
      )
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ _id: -1 }),
      ctx.model.Article.find({
        userId: user._id,
        status,
        $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
      }).count(),
      // find()第一个{} 放where条件 第二个{} 指定那些列显示和不显示 （0表示不显示 1表示显示)
    ]);
    return {
      list,
      count,
    };
  }
  // 根据id获取文章详情
  async getArticleDetailByArticleId(id) {
    const { ctx } = this;
    return await ctx.model.Article.find({ _id: id }).populate([
      { path: 'tagId', select: 'tagName' },
      { path: 'categoryId', select: 'categoryName' },
    ]);
  }
  // 根据文章id删除文章
  async delArticleById(id) {
    const { ctx } = this;
    // 如果truly为真，则真正删除该文章，否则改变文章的status，加入垃圾箱
    if (ctx.request.body.truely) {
      return await ctx.model.Article.remove({ _id: id });
    }
    return await ctx.model.Article.update({ _id: id }, { status: ctx.request.body.status });
  }
  // 根据文章id的数组批量删除文章
  async delArticleBatch(list) {
    const { ctx } = this;
    if (ctx.request.body.truely) {
      return await ctx.model.Article.remove({ _id: { $in: list } });
    }
    return await ctx.model.Article.update(
      {
        _id: { $in: list },
      },
      { status: ctx.request.body.status },
      { multi: true }
      // multi (boolean)： 默认为false。是否更新多个查询记录。
    );
  }
  // 根据文章id恢复文章至垃圾箱文章
  async recoveryArticleById(id) {
    const { ctx } = this;
    return await ctx.model.Article.update({ _id: id }, { status: 1 });
  }
  // 根据文章id的数组批量恢复文章至垃圾箱文章
  async recoveryArticleBatch(list) {
    const { ctx } = this;
    return await ctx.model.Article.update({ _id: { $in: list } }, { status: 1 }, { multi: true });
  }

  // 编辑文章页获取用户的标签和分类数据
  async getCategoryListById(id) {
    const { ctx } = this;
    return await ctx.model.Category.find({ userId: id }, { __v: 0, userId: 0 });
  }

  // 根据用户id获取标签列表，只返回所有标签，用于文章编辑页
  async getTagsListById(id) {
    const { ctx } = this;
    return await ctx.model.Tag.find({ userId: id }, { __v: 0, userId: 0 });
  }
  //----------------------------------
  // 创建分类
  async createCategory(categoryName) {
    const { ctx } = this;
    const user = await ctx.getUserData();
    return await ctx.model.Category.create({
      categoryName,
      userId: user._id,
    });
  }
  // 分类列表页获取分类列表，包括数量
  async getCategoryList(id, page) {
    const { ctx } = this;
    const [list, count] = await Promise.all([
      ctx.model.Category.find({ userId: id }, { __v: 0, userId: 0 })
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ _id: -1 }),
      ctx.model.Category.find({ userId: id }, { _v: 0, userId: 0 }).count(),
    ]);
    return { list, count };
  }
  // 修改分类信息
  async modifyCategory(_id, categoryName) {
    const { ctx } = this;
    return await ctx.model.Category.update({ _id }, { categoryName });
  }
  // 删除分类信息
  async delCategory(id) {
    const { ctx } = this;
    return await ctx.model.Category.remove({ _id: id });
  }
  // 批量删除分类信息
  async delCategoryBatch(list) {
    const { ctx } = this;
    return await ctx.model.Category.remove({ _id: { $in: list } });
  }
  // 检查重复分类
  async checkDuplicateCategory(categoryName) {
    const { ctx } = this;
    const res = await ctx.model.Category.find({ categoryName });
    return res.length === 0;
  }
  //----------------------------------
  // 创建标签
  async createTag(tagName) {
    const { ctx } = this;
    const user = await ctx.getUserData();
    return await ctx.model.Tag.create({ tagName, userId: user._id });
  }
  // 标签列表页获取标签列表，包括数量
  async getTagList(id, page) {
    const { ctx } = this;
    const [list, count] = await Promise.all([
      ctx.model.Tag.find({ userId: id }, { __v: 0, userId: 0 })
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ _id: -1 }),
      ctx.model.Tag.find({ userId: id }, { __v: 0, userId: 0 }).count(),
    ]);
    return {
      list,
      count,
    };
  }
  // 修改标签
  async modifyTag(_id, tagName) {
    const { ctx } = this;
    return await ctx.model.Tag.update({ _id }, { tagName });
  }
  // 删除标签
  async delTag(id) {
    const { ctx } = this;
    return await ctx.model.Tag.remove({ _id: id });
  }
  // 批量删除标签
  async delTagBatch(list) {
    const { ctx } = this;
    return await ctx.model.Tag.remove({ _id: { $in: list } });
  }
  // 检查重复标签
  async checkDuplicateTag(tagName) {
    const { ctx } = this;
    const res = await ctx.model.Tag.find({ tagName });
    return res.length === 0;
  }

  //----------------------------------
}
module.exports = BlogService;
