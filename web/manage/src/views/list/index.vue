<template>
  <xyz-my-layout>
    <div class="list">
      <div class="search-top">
        <div class="input"><input type="text" v-model="thing"></div>
        <div class="choose-time" @click="showPopup">{{timeMD||'选择日期'}}</div>
        <div class="s-btn" @click="search">搜索</div>
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" >
        <van-datetime-picker
          v-model="currentDate"
          type="month-day"
          title="选择时间"
          @confirm="chooseTime"
          @cancel="show=false"
          :formatter="formatter"
        />
      </van-popup>

      <div class="add" @click="add">新增</div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >

        <van-swipe-cell v-for="(item,index) in list" :key="index" >
          <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" >
              <template #title>
                <div >{{index+1}}、{{item.time}}<span>{{item.typeName}}</span> </div>
              </template>
              <p v-for="(val,i) in item.things" :key="i">{{i+1}}.{{val.value}}</p>
              <p v-if="item.remark">备注：{{item.remark}}</p>
            </van-collapse-item>
          </van-collapse>
          <template #right>
            <van-button square type="danger" text="删除" @click="del(item.id)"/>
            <van-button square type="primary" text="编辑" @click="edit(item.id)"/>
          </template>
        </van-swipe-cell>

    </van-list>
    </div>
  </xyz-my-layout>
</template>

<script>
import { getList, deleteData } from '@/api/date'
import { parseTime } from '@/utils'

export default {
  data () {
    return {
      activeNames: [],
      thing: '', // todo 搜索
      list: [],
      loading: false,
      finished: false,
      pageNo: 1,
      pageSize: 20,
      show: false,
      currentDate: new Date(),
      timeMD: ''
    }
  },
  methods: {
    formatter (type, val) {
      if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    showPopup () {
      this.show = true
    },
    chooseTime (val) {
      this.timeMD = parseTime(val, '{m}/{d}')
      this.show = false
    },
    search () {
      if (!(this.timeMD || this.thing)) {
        this.$toast('请先输入关键字或者选择时间')
        return false
      }
      this.pageNo = 1
      this.finished = false
      this.onLoad()
    },
    onLoad () {
      const query = {
        thing: this.thing,
        timeMD: this.timeMD,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      this.$loading.open()
      this.loading = true
      getList(query).then(res => {
        // 加载状态结束
        this.loading = false
        this.$loading.close()
        const { totalPage, list } = res
        // 拼接
        if (this.pageNo == 1) {
          this.list = list
        } else {
          this.list = this.list.concat(list)
        }
        // 数据全部加载完成，用当前页数和总页数做判断
        if (this.pageNo >= totalPage) {
          this.finished = true
        } else {
          this.pageNo++
        }
      }).catch(() => {
        this.loading = false
        this.finished = true
        this.$loading.close()
      })
    },
    add () {
      this.$router.push({ name: 'listAdd' })
    },
    edit (id) {
      this.$router.push({ path: '/list/add', query: { id } })
    },
    del (id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除？'
      })
        .then(() => {
          // on confirm
          deleteData({ id }).then(res => {
            this.$toast('删除成功')
            this.pageNo = 1
            this.onLoad()
          })
        })
        .catch(() => {
          // on cancel
        })
    }

  }
}
</script>

<style lang="scss" scoped>
.list{height: 100%;
  .add{position:fixed;right: 10px;bottom:10px;width: 60px;height: 60px;background:deepskyblue;color: #fff;text-align: center;border-radius: 60px;z-index: 999;line-height: 50px;border:5px solid orange}
  .search-top{display: flex;margin-bottom: 10px;padding: 6px;background: rgba($color: #0b5cd6, $alpha: 0.1);line-height: 30px;;
        .input{flex:1;}
        input{border:1px solid #ccc;border-radius: 3px;background: rgba($color: #0b5cd6, $alpha: 0.3);height: 30px;}
       .choose-time{width:100px ;text-align: center;}
       .s-btn{width: 60px;text-align: center;height: 30px;cursor: pointer;background: rgba($color: #0b5cd6, $alpha: 0.5);color: #fff;}
      }
}
</style>
