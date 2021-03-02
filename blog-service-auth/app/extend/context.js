'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  //  用于生产token
  async getToken(data) {
    return await this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: 30 * 24 * 60 * 60 + 's',
    });
  },

  //  用于检查token
  async checkToken(token) {
    return await this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
  // 获取用户信息
  async getUserData() {
    let user = {};
    let token = this.headers.authorization ? this.headers.authorization : '';
    token = token.substring(7); // 把Bearer 截取掉，解析的时候不需要加上Bearer
    try {
      user = this.app.jwt.verify(token, this.app.config.jwt.secret);
    } catch (err) {
      user = {};
    }
    return user;
  },

  returnBody(status = true, body = {}, msg = '请求成功', code = 200) {
    this.status = code;
    this.body = {
      status,
      body,
      msg,
      code,
    };
  },
};
// 调用 const { ctx } = this; ctx.returnBody(true, {}, "成功");
