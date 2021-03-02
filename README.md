# blog-project-auth
egg+jwt鉴权+vue+react实现博客服务、后台管理系统、前端展示页面

前端：vue 、react实现登录、博客的增删改查和展示等

服务端：
一、技术栈： egg.js：企业级框架，按照一套统一的约定进行应用开发，开发十分高效。mongodb：一个基于分布式文件存储的数据库，比较灵活。 

二、全局中间件和扩展配置：1、扩展context统一处理返回数据格式 ；2、添加统一处理错误得中间件： error_handler.js , 并配置 congfig 全局中间件配置；
三、jwt鉴权登录认证 ：1、安装 egg-jwt token生成以及验证包 npm install egg-jwt --save 2、2、安装完成后在根目录下的 config/plugin.js 配置一下；3、在 context 上扩展两个 function , getToken 和 checkToken 用于生成 token 和验证 token  4、编写个中间件实现登录验证拦截 在 app/middleware 文件夹下新建 auth.js
