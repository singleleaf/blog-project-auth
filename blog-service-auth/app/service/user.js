/* eslint-disable jsdoc/check-param-names */
'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async createUser(username, password, email, name) {
    const { ctx } = this;
    return await ctx.model.User.create({
      username,
      password,
      email,
      name: name || username,
    });
  }
  /**
   * 根据用户名查找用户
   * @param username
   * @return {Promise<void>}
   */
  async getUsersByUsername(username) {
    const { ctx } = this;
    if (username.length === 0) {
      return null;
    }
    return ctx.model.User.findOne({ username: { $in: username } }).exec();
  }
  /**
   * 根据邮箱查找用户
   * @param email
   * @return {Promise<void>}
   */
  async getUsersByEmail(email) {
    const { ctx } = this;
    if (email.length === 0) {
      return null;
    }
    const query = { email: { $in: email } };
    return ctx.model.User.findOne(query).exec();
  }
  /**
   * 根据用户ID，查找用户
   * @param {String} id 用户ID
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  async getUserById(id) {
    const { ctx } = this;
    if (!id) {
      return null;
    }
    return ctx.model.User.findOne({ _id: id }).exec();
  }

  /**
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  async getUsersByQuery(query) {
    const { ctx } = this;
    return ctx.model.User.find(query).exec();
  }
}
module.exports = UserService;
