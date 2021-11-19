### 使用
```
        <xyz-upload-img @choose="choose" :beforeImgList="beforeImgList" @change="change"></xyz-upload-img>
```

### 属性
beforeImgList---之前的数据，用于编辑的时候回显数据
uploadImgList---新增的数据（后台返回的图片数据）

### event
change----数据放生变化，用于删除，返回三个参数（新上传的数据，老数据(用于编辑的时候)，老数据删除的图片）
choose----选择了图片的时候放生变化，返回两个参数（formdata，file）

delBeforeImg----删除事件，返回（当前操作的数据，index）
delete----------同插件的delete，返回（file，detail）
file	file 对象	object
detail	额外信息，包含 name 和 index 字段	object


### slot name="title"
自定义标题