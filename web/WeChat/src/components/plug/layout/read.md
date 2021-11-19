### 使用
```
<!--tempalte-->
<xyz-xyz-my-layout :left-text="返回首页">

    <template #left><!--（可选）-->
        <!--slot name="left" header左侧自定义，默认是“返回”-->
    </template>

    <template #right><!--（可选）-->
        <!--slot name="right" header右侧自定义，默认“无”-->
    </template>

    <!--内容区域直接写即可-->

</xyz-xyz-my-layout>
```

### 关于header 其他属性 同vant
left-text----------------左侧文字，默认'返回'
left-arrow---------------左侧是否有箭头，默认是true
border-------------------开启底部边框线，默认是启用
placeholder -------------占位，默认是启用占位
fixed--------------------固定在顶部，默认是固定在顶部
@click-left--------------左侧自定义事件，isBack为false的时候生效，自定义一个左侧区域事件

### 根据路由配置信息（isDIY为true时不生效）
eg:
meta:{footer:true,header:false,title:'首页'}
footer------- 默认是false，项目中大部分页面都应该是没有底部导航的,个别需要的单独定义为true

header---------- 默认是true，项目大部分页面应该都是有顶部栏的，个别不需要的就单独定义false

title----------- 页面名称

### 可在组件上自定义的属性，如果需要修改【title、isFoot、isHeader】前提一定要开启isDIY，否则以路由配置为主
isDIY:{//启动自定义，直接在组件上修改，不通过路由控制信息，默认false，以路由为主
    type:Boolean,
    default:false
},
title: {//标题，需要开启isDIY，否则默认路由配置
    type: String,
    default: ''
},
isFoot:{//是否有底部导航，需要开启isDIY，否则默认路由配置
    type:Boolean,
    default:false
},
isHeader:{//是否有头部区域，需要开启isDIY，否则默认路由配置
    type:Boolean,
    default:true
},

isBack:{//左侧区域是否是返回，默认左侧区域都是返回
    type:Boolean,
    default:true
},
backPathName: {//isBack为false的时候，返回的路径不生效，默认是返回上一级，有特殊跳转就单独定义
    type: String,
    default: ''
},
isFrist:{//是否是一级页面，默认false，如果是则设置为true；一级页面默认没有返回操作，必有底部导航
    type:Boolean,
    default:false
},


### redirect重定向
如果你再跳转的时候，带了redirect在query里，那么返回的时候将默认以这个redirect为返回地址，redirect里可以有query
eg：localhost:8080/#/list?redirect=home&id=1
最后点击返回的时候，就是跳转到localhost:8080/#/home?id=1

使用时：如果你希望a页面跳到某b页面，最后b返回的时候还是到a页面；只要从a跳转的时候带上redirect即可，无需做其他的设置