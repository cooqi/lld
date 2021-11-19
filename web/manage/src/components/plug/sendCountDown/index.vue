<template>
    <div class="send-count-down">
        <div class="count-down van-hairline--surround">
            <van-count-down :time="countTime" :format="format" v-if="!timeFinish" @finish="finish" @change ="change " class="count-num"/>
            <span v-else class="send-btn">{{text}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'xyzSendCountDown',
  props: {
    format: {
      type: String,
      default: 'ss'
    },
    time: {
      type: [String, Number],
      default: 60 * 1000
    },
    text: {
      type: String,
      default: '发送验证码'
    }
  },
  data () {
    return {
      timeFinish: true,
      countTime: 0
    }
  },
  methods: {
    send () {
      this.$emit('send')
      this.timeFinish = false
      this.countTime = this.time
    },
    finish () {
      this.$emit('finish')
      this.timeFinish = true
    },
    change (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
    .send-count-down{
        .count-down{display: inline-block;padding: 5px 8px;min-width: 70px;text-align:center;}
        .count-num{color: #999;}
    }
</style>
