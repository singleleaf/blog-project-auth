'use strict';
// app/controller/user.js
// 获取个人信息
const Controller = require('egg').Controller;

class userController extends Controller {
  async info() {
    const { ctx } = this;
    const user = await this.ctx.getUserData();
    ctx.returnBody(true, user);
  }
}

module.exports = userController;
