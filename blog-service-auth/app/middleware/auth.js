'use strict';

/**
 * 登录验证
 * @author huangwei9527
 * @return {null} null
 */
module.exports = () => {
  return async function (ctx, next) {
    let token = '';
    if (
      ctx.headers.authorization &&
      ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query.token) {
      token = ctx.query.token;
    } else if (ctx.request.body.token) {
      token = ctx.request.body.token;
    }
    let user;
    try {
      user = await ctx.checkToken(token);
    } catch (e) {
      ctx.returnBody(false, {}, 'Token 无效，请重新登录', 401);
    }
    if (!user) {
      ctx.returnBody(false, {}, 'Token 无效，请重新登录', 401);
      return;
    }
    ctx.request.user = user;
    await next();
  };
};
