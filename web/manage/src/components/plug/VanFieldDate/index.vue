<template>
    <div>
         <van-field
           v-model="currentDate"
           v-bind="$attrs"
           error-message-align='right'
           readonly
           :is-link="$attrs.disabled === undefined"
            @click="showPopu($attrs.disabled)"
         />
        <van-popup v-model="showDate" round position="bottom">
            <van-datetime-picker
                v-if="type!='year'"
                ref="date"
                v-model="datetime"
              :min-date="minDate"
              :max-date="maxDate"
              :type="type"
              @confirm="confirmDate"
              @cancel="showDate = false"
            />
            <van-picker
                v-else
                ref="year"
                :columns="yearColumns"
                show-toolbar
                @cancel="showDate = false"
                @confirm="confirmDate"
            />
          </van-popup>
    </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'xyzFieldDate',
  model: {
    prop: 'selectValue'
  },
  props: {
    selectValue: {
      type: [Date, String],
      default: ''
    },
    minDate: {
      type: Date,
      default: () => {
        return new Date(1900, 0, 1)
      }
    },
    maxDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    },
    type: {
      type: String,
      default: 'date'
    },
    formatter: {
      type: String,
      default: '{y}-{m}-{d}'
    }
  },
  data () {
    return {
      showDate: false,
      yearColumns: [],
      currentDate: '',
      datetime: new Date()
    }
  },
  created () {
    this.type == 'year' && this.getYear()
  },
  computed: {

  },
  methods: {
    getYear () { // 设置只选年份时候的数据
      const maxY = Number.parseInt(parseTime(this.maxDate, '{y}'))
      const minY = Number.parseInt(parseTime(this.minDate, '{y}'))
      for (let i = maxY; i >= minY; i--) {
        this.yearColumns.push(i)
      }
    },
    showPopu (disabled) { // 显示隐藏
      if (disabled !== undefined && disabled !== false) {
        return false
      } else {
        this.showDate = !this.showDate
      }
    },
    confirmDate (val) { // 确定
      this.showDate = false
      this.currentDate = this.type == 'year' ? val : parseTime(val, this.formatter)
      this.$emit('confirm', val)
    }
  },
  watch: {
    selectValue: {
      handler (val) {
        if (val) {
          this.currentDate = this.type == 'year' ? val : parseTime(val, this.formatter)

          if (typeof val == 'string') {
            this.datetime = new Date(val)
          } else {
            this.datetime = val
          }
        } else {
          this.currentDate = ''
        }
      },
      deep: true,
      immediate: true
    },
    currentDate (val) {
      this.$emit('input', val)
    },
    showDate (val) {
      if (val) { // 时间回显
        this.$nextTick(() => {
          if (this.type == 'year') {
            const val = Number.parseInt(this.selectValue)
            this.$refs.year.setValues([val])
          }
        })
      }
    }
  }
}
</script>
