'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg 代理设置';
    ctx.returnBody(
      true,
      {
        list: [
          { name: '首页', age: 10, grade: '三年级' },
          { name: '首页', age: 10, grade: '四年级' },
        ],
      },
      '首页请求了'
    );
  }
}

module.exports = HomeController;
