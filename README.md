>前端页面尽量都写到view中
## 安装说明
可以把项目文件放在服务器目录的任意文件夹，
>然后去config.js 配置后台接口的地址，要求地址必须写到后台框架的public目录下，例如.http://www.example.com/项目名/pbulic/（如果你的后端没有指向到public目录），如果已经指向public目录则直接写http://www.example.com/ ,无论哪种方式写地址时都要在最后加上/
配置好后就可以访问web/start/ 如果没有弹窗报错说明接口正常

## 后台前端目录结构
后台前端可以放在任何一个服务器上
web  WEB部署目录（或者子目录）

├─dist                  应用目录
│  ├─controller         js模块目录
│  ├─lib                扩展目录
│  │  ├─extend          扩展js库目录
│  │    ...             其他文件                  
│  ├─style              样式定义目录
|  |   ├─red            资源文件夹
|  │
|  ├─View               前端界面目录
|  │  ├─module_name     模块目录
|  |        | ...       子模块目录或者html文件
|  ├─config.js          前端配置文件
|  └─index.js           入口js文件
└─start                 前端入口
    ├─layui             layui核心文件
    └─index.html        网站入口html
