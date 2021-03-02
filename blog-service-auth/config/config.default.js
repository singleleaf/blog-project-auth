/* eslint-disable arrow-parens */
/* eslint-disable array-bracket-spacing */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614412101478_3875';
  // 添加以下配置，注意位置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // 统一错误信息配置（注：match和ignore不可以同时配置）
  config.errorHandler = {
    enable: true, // 中间件开启配置
    match: '', // 设置请求中间件的请求路由
    // ignore: '', // 设置不经过这个中间件的请求路由
  };

  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/inkwash',
    options: {},
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
