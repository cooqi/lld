<template>
  <div>
    开开心心浪浪钉
    <van-button round type="info" @click="goto">进入管理</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goto () {
      this.$router.push({ name: 'list' })
    }
  }
}
</script>
