<template>
    <div>
        <xyz-upload-img @choose="choose" :beforeImgList="beforeImgList" @change="change" :uploadImgList="uploadImgList"></xyz-upload-img>

        <h3>视频录像</h3>
        <input class="camera" ref="camera" type="file" capture="camcorder" accept="video/*" multiple>
    </div>
</template>

<script>
export default {
  data () {
    return {
      beforeImgList: [
        { id: '1', img: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        { id: '2', img: 'https://img.yzcdn.cn/vant/cat.jpeg' }
      ],
      uploadImgList: []
    }
  },
  methods: {
    choose (FileFormData, file) {
      // 如果默认的FormData不是想要的，请根据file进行重新定义
      const param = new FormData()
      param.append('file', file.newfile)
      // todo 上传成功后，赋值uploadImgList
      this.uploadImgList.push({ id: '3', img: 'https://img.yzcdn.cn/vant/cat.jpeg' })
    },
    change (newImg, oldImg, oldDelImg) {
      console.log(newImg, oldImg, oldDelImg)
      this.uploadImgList = newImg
      this.beforeImgList = oldImg
    }
  }
}
</script>
