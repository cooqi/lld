<template>
    <div class="dhcc-box">
        <van-nav-bar
        :title="titleName"
        :left-text="isFrist?'':$attrs['left-text'] ?$attrs['left-text']:'返回'"
        :left-arrow="$attrs['left-arrow']===false || isFrist?false:true"
        :border="$attrs['border']===false?false:true"
        :placeholder ="$attrs['placeholder']===false?false:true"
        :fixed="$attrs['fixed']===false?false:true"
        @click-left="onClickLeft"
        v-if="isheader"
        >
          <template #left>
              <slot name="left"></slot>
          </template>

          <template #right>
              <slot name="right"></slot>
          </template>
        </van-nav-bar>

        <div class="dhcc-content">
            <slot></slot>
        </div>
        <template v-if="isfooter">
            <footerTab/>
        </template>
    </div>
</template>

<script>
import footerTab from './footer'
export default {
  name: 'xyzMyLayout',
  props: {
    title: {
      type: String,
      default: ''
    },
    backPathName: { // 返回的路径
      type: String,
      default: ''
    },
    isFoot: { // 是否有底部
      type: Boolean,
      default: false
    },
    isHeader: { // 是否有头部区域
      type: Boolean,
      default: true
    },
    isBack: { // 左侧区域是否是返回
      type: Boolean,
      default: true
    },
    isDIY: { // 启动自定义，直接在组件上修改，不通过路由控制信息
      type: Boolean,
      default: false
    },
    isFrist: { // 是否是第一级页面，第一级页面不显示返回,默认有底部导航
      type: Boolean,
      default: false
    }
  },
  components: { footerTab },
  data () {
    return {
      isfooter: false,
      isheader: true,
      titleName: '',
      otherQuery: {}, // 重定向带的query
      redirect: ''// 重定向地址
    }
  },
  mounted () {

  },
  computed: {

  },
  created () {
    this.isfooter = this.isDIY ? this.isFoot : this.isFrist ? true : this.$route.meta.footer
    this.isheader = this.isDIY ? this.isHeader : this.$route.meta.header !== false
    this.titleName = this.isDIY ? this.title : this.$route.meta.title
  },
  watch: {
    $route: {
      handler: function (val) {
        this.isfooter = this.isDIY ? this.isFoot : this.isFrist ? true : val.meta.footer
        this.isheader = this.isDIY ? this.isHeader : val.meta.header !== false
        this.titleName = this.isDIY ? this.title : val.meta.title

        const query = val.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    getOtherQuery (query) { // 获取除了redirect外的参数
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    onClickLeft () { // 返回
      if (this.isFrist) { // 第一级页面没有返回操作
        return false
      }
      if (this.isBack) { // 是否有返回操作，有就跳转
        if (this.backPathName) { // 如果有自定义的返回地址，则跳转到对应的地址
          this.$router.push({ name: this.backPathName, params: { isChat: true } })
        } else {
          if (this.redirect) { // 如果有redirect跳转到redirect
            this.$router.push({ path: this.redirect, query: this.otherQuery })
          } else { // 否则就范湖是上一页
            this.$router.go(-1)
          }
        }
      } else { // 没有就让组件单独定义
        this.$emit('click-left')
      }
    }
  }
}
</script>

<style>
.dhcc-box{height:100%;overflow: hidden;display: flex;flex-direction: column;}
.dhcc-content{flex:1;overflow-y: auto;}
</style>
