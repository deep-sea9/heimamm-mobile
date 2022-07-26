<template>
  <div class="post">
    <van-nav-bar
      title="修改岗位"
      left-arrow
      @click-left="$router.push('/mine')"
    >
    </van-nav-bar>
    <div class="input">
      <van-field v-model="post" placeholder="请输入岗位"></van-field>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: '最最最'
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  padding: 20px 10px;
}
::v-deep .van-icon-arrow-left {
  color: #171717;
}
::v-deep .van-field {
  height: 50px;
  line-height: 35px;
  background-color: #f7f4f5;
  border-radius: 10px;
}
</style>
