// app/model/tag.js
'use strict';
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagSchema = new Schema({
    tagName: { type: String },
    // count: { type: Number },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  return mongoose.model('Tag', TagSchema);
  // model(参数1，参数2，参数3）参数3是你数据表中需要操作的表的名字，
  // 比如我现在要操作的是名字叫mongoTest里面的叫userInfo的表
};
