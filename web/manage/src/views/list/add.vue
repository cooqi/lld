<template>
    <xyz-my-layout>
    <div class="manage">
      <van-form validate-first  @submit="save">
        <xyz-field-date
              label="时间"
              v-model="form.time"
              :min-date="minDate"
              :max-date="maxDate"
              formatter="{y}/{m}/{d}"
         />

        <div class="somethings">
          <div v-for="(item,index) in conArr" :key="index">
          <van-field
            v-model="item.value"
            name="pattern"
            :placeholder="'输入事件'+(index+1)"
          >
          <template #button v-if="index>0">
            <van-button size="mini" type="warning" @click.prevent="del(index)">-</van-button>
          </template>
          </van-field>
        </div>
        <van-button block  type="primary" @click.prevent="add">添加新的事件</van-button>
        </div>

        <xyz-field-select-picker
          label="今日事件类型"
          label-width="160"
          placeholder="请选择"
          v-model="form.type"
          :columns="columns"
      />

      <van-field
        v-model="form.remark"
        rows="2"
        autosize
        label-width="40"
        label="备注"
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
    </div>
</xyz-my-layout>
</template>

<script>

import { addData, getDateById, modifyData, typeDict } from '@/api/date'
import { utf16toEntities } from '@/utils'
export default {
  data () {
    return {
      form: {
        time: '',
        type: '',
        things: [],
        remark: ''
      },
      maxDate: new Date(),
      minDate: new Date('1990/1/1'),
      conArr: [
        { value: '' }
      ],
      columns: [],
      id: ''
    }
  },
  created () {
    this.getTypeDict()

    this.id = this.$route.query.id
    if (this.id) {
      this.getData(this.id)
    }
  },
  methods: {
    async getTypeDict () {
      this.columns = await typeDict()
    },
    getData (id) {
      getDateById({ id }).then(res => {
        this.form = res
        this.conArr = this.form.things
      })
    },
    add () {
      const obj = { value: '' }
      this.conArr.push(obj)
    },
    del (i) {
      this.conArr.splice(i, 1)
    },
    saveAdd (form) {
      alert(JSON.stringify(form.things[0]))
      addData(form).then(res => {
        this.$dialog.confirm({
          title: '成功',
          message: '新增成功',
          confirmButtonText: '继续添加',
          cancelButtonText: '返回列表'
        })
          .then(() => {
          // on confirm
            this.form = {
              time: '',
              type: '',
              things: [],
              remark: ''
            }
            this.conArr = [
              { value: '' }
            ]
          })
          .catch(() => {
          // on cancel
            this.$router.push({ name: 'list' })
          })
      })
    },
    saveEdit (form) {
      modifyData(form).then(res => {
        this.$toast('编辑成功')
        this.$router.push({ name: 'list' })
      })
    },
    save () {
      const form = this._.cloneDeep(this.form)
      if (!form.time) {
        this.$toast('请选择时间')
        return false
      }
      form.things = this.conArr.filter(item => {
        return item.value
      })
      if (!form.things.length) {
        this.$toast('请填写对应的事件')
        return false
      } else {
        form.things = form.things.map(item => {
          item.value = utf16toEntities(item.value)

          return item
        })
        if (form.remark) {
          form.remark = utf16toEntities(form.remark)
        }
      }
      if (this.id) {
        this.saveEdit(form)
      } else {
        this.saveAdd(form)
      }
    }
  }
}
</script>

  <style scoped lang="scss">
  .manage{
    .somethings{margin: 10px 0;}
  }
  </style>
