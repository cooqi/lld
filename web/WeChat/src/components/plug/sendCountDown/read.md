# 倒计时 和van-count-down 使用方法基本一致

### 使用方法
```
<xyzSendCountDown :time="6000" ref="countDown" @click.native="sendVerifyCode" :text="发送短信"/>

sendVerifyCode () {
      this.$refs.countDown.send()
}
```

### Props
参数--------| 说明 |	------------------| 类型-------------------| 默认值 |
time-------| 倒计时时长，单位毫秒 |--------| number | string|-------| 60*1000 |
format-----| 时间格式 |	------------------| string |	-----------| HH:mm:ss |
text-------| 发送验证码 |-----------------| string |	-----------| 发送验证码 |

### format 格式
格式	说明
DD	天数
HH	小时
mm	分钟
ss	秒数
S	毫秒（1 位）
SS	毫秒（2 位）
SSS	毫秒（3 位）

### Events
事件名	 说明	                     回调参数
finish	 倒计时结束时触发	          -
change   倒计时变化时触发	         timeData: TimeData

### ref 方法
send() 触发倒计时