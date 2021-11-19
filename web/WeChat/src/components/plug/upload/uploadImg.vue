<template>
    <div class="dh-upload">
        <div class="textareatitle">
          <slot name="title">
            <span>照片</span>
            <span>(支持格式：jpg、png、jpeg 附件大小 20M)</span>
          </slot>
        </div>
        <div class="beforeImgList">
            <div class="before-img-item" @click="viewImg(item.img)"  v-for="(item,index) in oldimgList" :key="item.id">
                <van-image  width="60" height="60" :src="item.img" />
                <span @click.stop="delBeforeImg(index,item)">x</span>
            </div>
        </div>
        <van-uploader v-model="fileList" multiple :after-read="afterRead" @delete="deleteImg">
            <van-button icon="plus"></van-button>
        </van-uploader>
    </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  name: 'xyzUploadImg',
  model: {
    prop: 'uploadFILE'
  },
  props: {
    beforeImgList: {
      type: [Array, String],
      default: () => {
        return []
      }
    },
    uploadImgList: {
      type: Array,
      default: () => {
        return []
      }
    },
    uploadFILE: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      hadDelImg: [], // 之前的图片被删除的信息
      fileList: this._.cloneDeep(this.uploadFILE)
    }
  },
  computed: {
    oldimgList () { // 之前图片--用于编辑回显
      return this.beforeImgList || []
    },
    newfileList () { // 新上传的图片信息
      return this.uploadImgList
    }
  },
  watch: {
    fileList (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    viewImg (src) {
      ImagePreview([src])
    },
    delBeforeImg (index, item) {
      // 删除之前的图片,并保存被删除的图片
      this.hadDelImg.push(...this.oldimgList.splice(index, 1))
      this.$emit('change', this.newfileList, this.oldimgList, this.hadDelImg)
      this.$emit('delBeforeImg', item, index)
    },
    afterRead (file) { // 选择文件后
      const param = new FormData()
      param.append('file', file.file)
      this.$emit('choose', param, file)
    },
    deleteImg (data, val) { // 删除新上传的文件
      this.newfileList.splice(val.index, 1)
      this.$emit('del', this.newfileList, this.oldimgList, this.hadDelImg)
      this.$emit('change', this.newfileList, this.oldimgList, this.hadDelImg)
      this.$emit('delete', data, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dh-upload{
  margin:10px 0;
  .textareatitle{font-size: 14px;margin-bottom: 10px;color: #646566;}
  .beforeImgList{display:flex;flex-wrap: wrap;
    .before-img-item{margin:5px;position: relative;
      span{position: absolute;width: 13px;height: 13px;right: 0;top:0;background: rgba(0,0,0,.8);color: #fff;text-align: center;line-height: 13px;border-radius: 0 0 0 10px;font-size: 12px;display: inline-block;}
    }
   }
   .van-uploader{
      .van-button{
        width: 80px;
        height: 80px;
      }
    }
}

</style>
