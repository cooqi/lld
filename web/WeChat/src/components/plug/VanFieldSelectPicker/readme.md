### js
```
 value1: 2,
      columns: [
        { name: 1, code: '11' },
        { name: 2, code: '22' }
      ],
```
### tempalte
```
   <xyz-field-select-picker
        label="物料类型"
        placeholder="请选择"
        v-model="value1"
        :columns="columns"
        :option="{label:'name',value:'code'}"
    />
```

### Events 同 vant-picker


|-confirm --	点击完成按钮时触发 -- 单列：选中[整个数据]的值，选中值对应的索引，选中的value-|
|-cancel  --	点击取消按钮时触发 -- 单列：选中[整个数据]的值，选中值对应的索引，选中的value-|
|-change  --	选项改变时触发     -- 单列：选中[整个数据]的值，选中值对应的索引，选中的value-|

### 属性
label-width ---------------------------label的一个宽度设置

label="单选select"---------------------label文字

:columns="columns"---------------------可选择的数据，只接受key-value格式的对象集合，[1,2,3]不可以

:option="{label:'name',value:'code'}"--数据的配置格式，默认label(显示的文字)，value（具体值）

:isSearch------------------------------是否开启搜索
offOption------------------------------ 关闭option配置key-value;当数据是非obj集合的数组的时候，开启;默认关闭

### ref事件
showPopu //显示弹出选项
可在调用的组件使用，如触发某个事件的时候显示选项
this.$refs.xxx.showPopu()

toggleAll  //全选
可在调用的组件使用
this.$refs.xxx.toggleAll()