<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="cachedViews">
        <router-view :key="key" class="Router" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    cachedViews () {
      return this.$store.state.app.cachedViews
    },
    key () {
      return this.$route.path
    }
  },
  data () {
    return {
      transitionName: 'slide-right' // 初始过渡动画方向
    }
  },
  watch: {
    $route () {
      this.addTags()
      // 切换动画
      const isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = false
    }
  },
  methods: {
    addTags () { // 存储需要缓存的组件信息
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('app/setCache', this.$route)
      }
      return false
    }
  }
}
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: #f2f2f2;
  position: relative;
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    position: absolute;
      height: 100%;
      width: 100%;
      transition: all .377s ease;
      will-change: transform;
      top: 0;
      backface-visibility: hidden;
      perspective: 1000;
  }
  .slide-right-enter,
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active,
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

}
</style>
