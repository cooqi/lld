<template>
  <div class="dh-field">
    <div class=" van-hairline--bottom">
    <van-field
      v-model="resultLabel"
      v-bind="$attrs"
      readonly
      :is-link="$attrs.disabled === undefined"
      input-align="right"
      @click="showPopu($attrs.disabled)"
      error-message-align='right'
      class="dh-cell"
    />
    <van-popup v-model="show" position="bottom">
      <van-field v-model="searchVal"  placeholder="搜索" @input="search" v-if="isSearch" input-align="left"/>
      <van-picker
        v-bind="$attrs"
        :columns="columnsData"
        show-toolbar
        @cancel="cancel"
        @confirm="onConfirm"
        @change="change"
        :value-key="this.option.label"
      />
    </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xyzFieldSelectPicker',
  model: {
    prop: 'selectValue'
  },
  props: {
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectValue: {
      type: [String, Number],
      default: ''
    },
    option: {
      type: Object,
      default: function () {
        return { label: 'label', value: 'value' }
      }
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    offOption: { // 关闭option配置key-value;当数据是非集合的数组的时候，开启
      type: Boolean,
      default: false
    }
  },
  computed: {
    resultLabel: {
      get () {
        const res = this.columns.filter(item => {
          const data = this.offOption ? item : item[this.option.value]
          return data === this.resultValue
        })
        let label = ''
        if (res.length) {
          label = this.offOption ? res[0] : res[0][this.option.label]
        }

        return label
      },
      set () {

      }
    }
  },
  data () {
    return {
      show: false,
      searchVal: '',
      resultValue: this.selectValue,
      columnsData: []
    }
  },
  methods: {
    search (val) {
      if (val) {
        this.columnsData = this.columnsData.filter(item => {
          const data = this.offOption ? item : item[this.option.label]

          return data.indexOf(val) > -1
        })
      } else {
        this.columnsData = JSON.parse(JSON.stringify(this.columns))
      }
    },
    onConfirm (value, index) {
      const data = this.offOption ? value : value[this.option.value]

      this.resultValue = data
      this.show = !this.show
      this.$emit('confirm', value, index, this.resultValue)
    },
    change (val, index) {
      this.$emit('change', val, index, this.resultValue)
    },
    cancel (val, index) {
      this.show = !this.show
      this.$emit('cancel', val, index, this.resultValue)
    },
    showPopu (disabled) {
      this.columnsData = JSON.parse(JSON.stringify(this.columns))
      this.resultValue = this.selectValue
      if (disabled !== undefined && disabled !== false) {
        return false
      } else {
        this.show = !this.show
      }
    }
  },
  watch: {
    selectValue: function (newVal) {
      this.resultValue = newVal
    },
    resultValue (val) {
      this.searchVal = ''
      this.columnsData = JSON.parse(JSON.stringify(this.columns))
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dh-field {
    padding: 0 16px;background:#fff;
    .dh-cell.van-cell{padding: 10px 0;}
    .dh-cell.van-cell--required::before{left: -8px;}
    .van-popup{border-radius: 20px 20px 0 0;}
  }
</style>
