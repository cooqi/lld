<template>
    <div style="text-align:center">
        <van-button type="primary" @click="openLoading">打开 loading</van-button>
    </div>
</template>

<script>
export default {
  methods: {
    openLoading () {
      this.$loading.open('打开中')
      setInterval(() => {
        this.$loading.close()
      }, 3000)
    }
  }
}
</script>
