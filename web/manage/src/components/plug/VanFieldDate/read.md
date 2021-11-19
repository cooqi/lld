### 日期选择
使用方法、属性和xyz-datetime-picker一致
<xyz-field-date/>
:min-date="minDate"  最小时间，默认的最小时间是1900
:max-date="maxDate"    最大时间,默认的最大时间是当前
:type="type"  类型
时间类型，可选值为 date time
year-month month-day datehour year

### 新增type为year，只选择年份

### 时间格式默认是yyyy-mm-dd
formatter '{y}-{m}-{d} {h}:{i}:{s}'