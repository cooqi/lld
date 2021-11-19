<template>
    <div class="login">
        <div class="login-box">
        <h3 class="van-hairline--bottom">登录</h3>
            <van-form @submit="onSubmit" class="form">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
    display: flex;flex-direction: column;align-items: center;height: 100%;
    h3{text-align: center;line-height: 50px;margin-bottom: 20px;}
    .login-box{width: 90%;margin: auto;background: #fff;padding: 20px;border-radius: 10px;}
}

</style>
