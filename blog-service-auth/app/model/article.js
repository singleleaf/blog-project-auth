'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const articleSchema = new Schema({
    title: { type: String, require: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tagId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
    html: {
      type: String,
    },
    createTime: {
      type: String,
      // 因为mongodb存入date类型会有早8个小时的问题，所以这里用String
    },
    updateTime: {
      type: String,
      // 因为mongodb存入date类型会有早8个小时的问题，所以这里用String
    },
    status: {
      type: Number,

      // 0:已发表
      // 1:草稿
      // 2: 已删除,
    },
  });

  return mongoose.model('Article', articleSchema);
};
