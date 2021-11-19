<template>
    <xyz-my-layout class="search">
      <div class="search-top">
        <div class="input"><input type="text" v-model="thing"></div>
        <div class="choose-time" @click="showPopup">{{timeMD||'选择日期'}}</div>
        <div class="s-btn" @click="search">搜索</div>
      </div>
      <div class="list">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >

            <div class="s-item" v-for="(item,index) in list" :key="index" >
              <h4>{{item.time}}</h4>
              <ul>
                <li  v-for="(val,i) in item.things" :key="i">
                  <span>{{val.value}}</span>
                </li>
              </ul>
              <p v-if="item.remark">备注：{{item.remark}}</p>
              <p>距今天<span>{{item.time | calRange}}</span>天</p>
            </div>

      </van-list>
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
    </xyz-my-layout>
</template>

<script>
import { getList } from '@/api/date'
import { parseTime } from '@/utils'
import { removeWatermark, setWaterMark } from '@/assets/js/watermark'

export default {
  data () {
    return {
      thing: '', // todo 搜索
      list: [],
      loading: false,
      finished: true,
      pageNo: 1,
      pageSize: 20,
      show: false,
      currentDate: new Date(),
      timeMD: ''
    }
  },
  filters: {
    calRange: function (value) {
      var start_date = new Date(value)
      var end_date = new Date()
      var days = (end_date - start_date) / 86400000
      return parseInt(days)
    }
  },
  mounted () {
    setWaterMark('love gjzzh', '仅lld粉丝使用')
  },
  destroyed () {
    removeWatermark()
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
    }

  }
}
</script>

  <style lang="scss" scoped>
    .search{padding: 10px;
      .search-top{display: flex;margin-bottom: 10px;padding: 6px;background: rgba($color: #0b5cd6, $alpha: 0.1);line-height: 30px;;
        .input{flex:1;}
        input{border:1px solid #ccc;border-radius: 3px;background: rgba($color: #0b5cd6, $alpha: 0.3);height: 30px;}
       .choose-time{width:100px ;text-align: center;}
       .s-btn{width: 60px;text-align: center;height: 30px;cursor: pointer;background: rgba($color: #0b5cd6, $alpha: 0.5);color: #fff;}
      }
      .s-item{padding: 10px;;background: #fff;border-radius: 5px;line-height: 160%;margin-bottom: 10px;
        li{padding: 5px;background: rgba($color: #0b5cd6, $alpha: 0.1);border-radius: 3px;margin: 5px 0;}
      }
    }
  </style>
