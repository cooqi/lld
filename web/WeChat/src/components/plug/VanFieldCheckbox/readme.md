### js
```
      value1: ['11'],
      columns: [
        { name: 1, code: '11' },
        { name: 2, code: '22' }
      ],
```
### tempalte

```
   <xyz-field-checkout
        ref="check"
        label="物料类型"
        placeholder="请选择"
        v-model="value1"
        :columns="columns"
        :option="{label:'name',value:'code'}"
    />
```

### Events 类似 van-field-select-picker


|-confirm --	点击完成按钮时触发 -- 单列：选中[value]值Arrray,选中[单条数据]值Arrray-|
|-cancel  --	点击取消按钮时触发 -- 单列：选中[value]值Arrray,选中[单条数据]值Arrray-|
|-change  --	选项改变时触发     -- 单列：选中[value]值Arrray,选中[单条数据]值Arrray-|

### 属性
label-width ---------------------------label的一个宽度设置
label="单选select"---------------------label文字
:columns="columns"---------------------可选择的数据，只接受key-value格式的对象集合，[1,2,3]不可以
:option="{label:'name',value:'code'}"--数据的配置格式，默认label(显示的文字)，value（具体值）
:isSearch------------------------------是否开启搜索

### ref事件
showPopu //显示弹出选项
可在调用的组件使用
this.$refs.xxx.showPopu()

toggleAll  //全选
可在调用的组件使用
this.$refs.xxx.toggleAll()