'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  // 登录
  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    // 验证是否存在
    const user = await service.user.getUsersByUsername(username);
    if (!user) {
      ctx.returnBody(false, {}, '用户不存在', 201);
      return;
    }

    // 生成token
    const userData = user.toObject();
    const userDataStr = JSON.parse(JSON.stringify(userData));
    const token = await ctx.getToken(userDataStr);
    ctx.returnBody(true, { access_token: token, userInfo: userData }, '登录成功!');
  }
  async register() {
    const { ctx, service } = this;
    const { username, password, email } = ctx.request.body;
    // 密码长度拦截
    if (!password) {
      ctx.returnBody(false, {}, '密码不能为空!', 201);
      return;
    } else if (password.length < 6) {
      ctx.returnBody(false, {}, '密码长度不能少于6位!', 201);
      return;
    } else if (password.length > 16) {
      ctx.returnBody(false, {}, '密码长度不能超过16位!', 201);
      return;
    }
    // 验证是否已注册
    const users = await service.user.getUsersByQuery({
      $or: [{ username }, { email }],
    });
    if (users.length > 0) {
      ctx.returnBody(false, {}, '用户名或邮箱已被注册!', 202);
      return;
    }

    let userData = await ctx.service.user.createUser(username, password, email);
    userData = userData.toObject();
    const userDataStr = JSON.parse(JSON.stringify(userData));
    // 生成token
    const token = await ctx.getToken(userDataStr);
    ctx.returnBody(true, { access_token: token, userInfo: userData }, '注册成功!');
  }
}

module.exports = AuthController;
