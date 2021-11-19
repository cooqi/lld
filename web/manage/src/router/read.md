### 页面部分信息根据路由配置信息（isDIY为true时不生效）
eg:
meta:{footer:true,header:false,title:'首页'}
footer------- 默认是false，项目中大部分页面都应该是没有底部导航的,个别需要的单独定义为true

header---------- 默认是true，项目大部分页面应该都是有顶部栏的，个别不需要的就单独定义false

title----------- 页面名称


### keep-alive 组件缓存
meta:{keepAlive:true,backKeepAlive:true}

keepAlive---当前组件进行缓存，默认false
backKeepAlive---从当前组件回去的list需要缓存，backKeepAlive：默认false