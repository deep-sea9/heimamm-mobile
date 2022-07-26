<template>
  <div class="edit">
    <van-nav-bar
      title="我的资料"
      left-arrow
      @click-left="$router.push('/mine')"
    >
      <!-- <template #left-arrow>
      <van-icon name=""></van-icon>
    </template> -->
    </van-nav-bar>
    <div class="content">
      <van-cell title="头像" is-link>
        <template #extra>
          <!-- <van-image src="@/img/8.jpg" width="20" height="20"></van-image> -->
          <img class="photo" :src="require('@/img/8.jpg')" alt="" />
        </template>
      </van-cell>
      <van-cell-group>
        <van-cell title="昵称" value="我嫩嫩" is-link></van-cell>
        <van-cell title="性别" value="女" is-link></van-cell>
        <van-cell title="地区" value="桂林市" is-link></van-cell>
        <van-cell title="个人简称" value="我你嘚嘚嘚得得" is-link></van-cell>
      </van-cell-group>
      <van-button plain type="danger" block>退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.edit {
  background-color: #f7f4f5;
  height: 667px;
  ::v-deep .van-icon-arrow-left {
    color: #171717;
  }
  .content {
    padding: 20px 15px;
    // 头像
    .photo {
      position: fixed;
      margin-left: 260px;
      margin-top: -5px;
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  ::v-deep .van-cell,
  .van-cell-group {
    border-radius: 10px;
  }
  ::v-deep .van-cell-group {
    margin-top: 10px;
  }
  ::v-deep .van-button {
    border-radius: 10px;
    border: none;
    margin-top: 20px;
  }
}
</style>
