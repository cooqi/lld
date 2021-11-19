<template>
 <xyz-my-layout  :isFrist="true">
  <van-tabs v-model="active">
        <van-tab title="newForm">
            <new-form/>
        </van-tab>
        <van-tab title="loading">
          <loading/>
        </van-tab>
        <van-tab title="上传">
          <upload/>
        </van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
   </van-tabs>
 </xyz-my-layout>
</template>

<script>
import newForm from './form'
import loading from './loading'
import upload from './upload'
export default {
  components: { newForm, loading, upload },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
