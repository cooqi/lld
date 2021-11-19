```
computed: {
    ...mapGetters({
      ws: 'ws'
    })
  }

//init连接
if (!this.ws) {
    //在socket.vue文件中初始化socket连接
    this.$store.dispatch('socketInit')
}

//发送
    this.ws.$soctket_emit(JSON.stringify({
        data: 'hello , world'
    }), () => {
        console.log('发送成功')
    })


```

### msgUnique  消息的唯一值
每一份消息都需要一个唯一值，用来和发送成功的消息做比对
chatId是成功后每条消息的唯一值，但是失败或者正在发送中的消息也需要一个唯一值，根据发送的消息和返回的成功消息做对比，才能知道哪些消息成功，哪些失败

### 历史消息存在window.indexedDB 