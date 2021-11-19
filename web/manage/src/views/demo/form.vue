<template>
    <div>
      <xyz-field-select-picker
          label="单选select"
          placeholder="请选择"
          v-model="value1"
          :columns="columns"
          :option="{label:'name',value:'code'}"
          @confirm="confirm2"
      />
      <div class="tip">
        <p>我选中的value:{{value1}}</p>
        <p>确定后，选中的整个obj数据:{{value4}}</p>
      </div>
      <xyz-field-checkbox
        label="多选checkbox"
        placeholder="请选择"
        v-model="value2"
        :columns="columns"
        label-width="100"
        :option="{label:'name',value:'code'}"
        @confirm="confirm"
      />
      <div class="tip">
        <p>我选中的value:{{value2}}</p>
        <p>确定后，选中的整个obj数据:{{value3}}</p>
      </div>

    </div>
</template>
<script>
export default {
  data () {
    return {
      value1: '1', // select选中的value
      value2: ['1'], // checkbox选中的value
      value3: [], // checkbox选中的obj集合
      value4: {}, // select选中的obj
      columns: [// 如果可选数据不是label-value,需要配置下option，如果是就不需要配置
        { name: '我是选中的label', code: '1', other: '额外数据' },
        { name: '我也是选中的label33333', code: '2', other: '额外数据' },
        { name: '我是选中的label', code: '21', other: '额外数据' },
        { name: '我也是选中的label555555555', code: '22', other: '额外数据' },
        { name: '我是选中的label', code: '11', other: '额外数据' },
        { name: '我也是选中的label', code: '52', other: '额外数据' },
        { name: '我是选中的label', code: '71', other: '额外数据' },
        { name: '我也是选中的label', code: '72', other: '额外数据' }
      ]
    }
  },
  methods: {
    confirm (data1, data2) { // select确定,
    // tips 正常获取值，用不到这个方法，用v-modal获取值即可，这个方法是告诉你，可以获取任何你想要的数据
    // data1 是当前选中数据的value的数组
    // data2 是当前选中数据的整个obj集合
      console.log(data1, data2)
      this.value3 = data2
    },
    confirm2 (data1, index, data2) { // checkbox确定,
    // tips 正常获取值，用不到这个方法，用v-modal获取值即可，这个方法是告诉你，可以获取任何你想要的数据
    // data1 当前这一条的obj数据
    // index 当前选择的索引
    // data2 当前这一条数据的value
      console.log(data1, data2, index)
      this.value4 = data1
    }
  }
}
</script>
<style scoped>
.tip{color: green;font-size: 12px;text-align: left;}
</style>
