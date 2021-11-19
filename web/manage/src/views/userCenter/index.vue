<template>
      <xyz-my-layout :isFrist="true">
        <div class="userCenter">
            <div class="userInfo">
                <div class="avatarAndName">
                    <van-image
                    round
                    width="80px"
                    height="80px"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    class="avatar"
                    />
                    <p class="username">用户名</p>
                </div>
            </div>

            <div class="userFunction">
                <van-cell-group class="cell-group">
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                </van-cell-group>

                <van-cell-group class="cell-group">
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                    <van-cell title="单元格"  is-link  icon="location-o"/>
                </van-cell-group>
            </div>
        </div>
      </xyz-my-layout>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
    .userCenter{
        .userInfo{height:28vh;background:lightskyblue;display: flex;align-items: center;padding: 0 15px;color: #fff;;}
        .avatarAndName{display: flex;align-items: center;}
        .username{margin: 0 10px;}
        .cell-group{margin: 10px 0;}
    }
</style>
