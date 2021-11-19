<template>
    <van-tabbar v-model="active" placeholder route>
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/demo">demo</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/list">list</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/userCenter">user</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
