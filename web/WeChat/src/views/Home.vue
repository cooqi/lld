
<template>
  <div class="home">
    <vue-hash-calendar ref="picker"
        model="inline"
        :is-show-arrow="false"
        :is-show-not-current-month-day="true"
        :scroll-change-date="true"
        :visible.sync="isShowCalendar"
        :default-datetime="defaultDatetime"
        :is-show-week-view="false"
        :is-show-action="true"
        :minute-step="1"
        :disabled-scroll="false"
        :mark-date="markDate"
        mark-type="dotcircle"
        week-start="sunday"
        picker-type="datetime"
        :show-today-button="true"
        :disabled-week-view="false"
        :change-year-fast="true"
        :theme-color="themeColor"
        format="YY/MM/DD"
        lang="cn"
        @calendarTypeChange="calendarTypeChange"
        @confirm="dateConfirm"
        @slidechange="slidechange"
        @click="dateClick"
        @change="dateChange">
    </vue-hash-calendar>
    <div class="content">
      <h3>猫猫狗狗的小记录</h3>
      <van-tabs v-model="active">
        <van-tab title="周年纪念">
          <template v-if="currentAnniversary.length">
            <div class="item" v-for="(item,index) in currentAnniversary" :key="index">
              <div>
                <h4>
                  {{index+1}}、{{item.time}}♡
                  <span v-if="currentYear-item.year>0">【{{currentYear-item.year}}周年】</span>
                  <span v-else>【{{item.year}}年新事件】</span>
                  </h4>
                <ul>
                  <li v-for="(val,i) in item.things" :key="i"><span>{{i+1}}</span>.<span>{{val.value}}</span></li>
                </ul>
                <p v-if="item.remark">备注：{{item.remark}}</p>
              </div>
            </div>
          </template>
          <p v-else class="tip">今天还没有纪念日哦，如果我们忘记加上，可以给我们留言</p>
        </van-tab>
        <van-tab title="跟今天相关">
          <template v-if="currentAboutToday.length">
            <div class="item" v-for="(item,index) in currentAboutToday" :key="index">
              <div>
                <h4>
                  {{index+1}}、{{item.time}}♡
                  <span>【{{getRemainderTime(item.time,currentTime)}}】</span>
                  </h4>
                  <ul>
                  <li v-for="(val,i) in item.things" :key="i"><span>{{i+1}}</span>.<span>{{val.value}}</span></li>
                </ul>
                <p v-if="item.remark">备注：{{item.remark}}</p>
              </div>
            </div>
          </template>
          <p v-else class="tip">跟今天相关的纪念日还没有哦，如果我们忘记加上，可以给我们留言</p>
        </van-tab>
      </van-tabs>

    </div>

    <div class="search" @click="search">搜索</div>
  </div>
</template>

<script>
import { getListToTime, getAnniversaryByMD, getDataAboutToday } from '@/api/date'
import { parseTime, monthDayDiff } from '@/utils'
import { removeWatermark, setWaterMark } from '@/assets/js/watermark'
export default {
  name: 'demo',
  data () {
    return {
      currentTime: new Date(), // 当前时间
      currentYear: new Date().getFullYear(), // 当前年份
      themeColor: {}, // 主题颜色
      isShowCalendar: true, // 是否显示弹窗
      isShowTips: false, // 是否显示下载提示
      defaultDatetime: new Date(),
      markDate: [], // 对象数组形式的标记日期，可以自定义标记颜色
      active: 0,
      currentAnniversary: [], // 周年纪念日，
      currentAboutToday: [] // 和今天相关的数据
    }
  },
  mounted () {
    setWaterMark('love gjzzh', '仅lld粉丝使用')
  },
  destroyed () {
    removeWatermark()
  },
  created () {
    this.getDate()
  },
  watch: {
    currentYear (val) {
      // 监听年份的变化，对数据就行重新拼接
      this.markDate.map(item => {
        item.date = [val + item.date[0].substring(4)]
        return item
      })
      // console.log('this.markDate', this.markDate, val)
    }
  },
  methods: {
    getDate () {
      getListToTime().then(res => {
        const { list } = res
        const dataList = list.map(item => {
          // 不同的type，画圈的颜色不一样
          let color = 'green'
          switch (item.type) {
            case 'important':
              color = 'red'
              break
            case 'birthday':
              color = 'pink'
              break
            case 'happyNewYear':
              color = 'orange'
              break
            case 'black':
              color = 'black'
              break
          }
          const date = this.currentYear + '/' + item.dateTime
          const obj = {
            color,
            date: [date]
          }
          return obj
        })
        //  console.log('dataList', dataList)
        this.markDate = dataList
      })
    },
    showCalendarDialog () { // 显示日历
      this.isShowCalendar = true
    },
    dateChange (date) { // 日期改变触发
      this.currentYear = new Date(date).getFullYear()
      this.currentTime = date
      console.log(date, this.currentYear, 'change')
      this.getCurrentThing(date)
    },
    getCurrentThing (date) {
      const timeMD = parseTime(date, '{m}/{d}')
      const timeToday = parseTime(date, '{d}')
      getAnniversaryByMD({ timeMD }).then(res => {
        this.currentAnniversary = res.list
      })

      getDataAboutToday({ timeToday }).then(res => {
        this.currentAboutToday = res.list
      })
    },
    getRemainderTime (st, ed) {
      return monthDayDiff(st, ed)
    },
    dateConfirm (date) { // 点击确认按钮触发
      console.log(date, 'confirm')
    },
    slidechange (direction) { // 滑动方向
      console.log(direction, 'direction')
    },
    dateClick (date) { // 点击日期时按钮触发
      console.log(date, 'click')
    },
    calendarTypeChange (type) { // 日历展示类型切换时触发
      console.log(type, 'calendarType')
    },
    search () {
      this.$router.push('search')
    }
  }
}
</script>
<style lang="scss" scoped>

.home{display: flex;flex-direction: column;height: 100%;}
.content{padding: 10px;overflow: auto;flex: 1;
  .item{margin: 10px 0;}
  h3{line-height: 200%;}
  h4{line-height: 180%;}
  .tip{color: orangered;}
  li{margin-bottom: 6px;}
}
.home /deep/ .van-tabs__content{padding: 10px;line-height: 160%;}
.search{position: fixed;right: 10px;bottom: 20px;width: 50px;height: 50px;background: #fff;border:5px solid pink;color: pink;text-align: center;line-height: 40px;font-size: 13px;border-radius: 100%;}
</style>
