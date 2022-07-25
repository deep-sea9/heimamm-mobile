<template>
  <div class="tabbar">
    <router-view></router-view>

    <van-tabbar route active-color="#ff0000">
      <van-tabbar-item icon="home-o" to="/company">
        <span>公司</span>
        <template #icon>
          <span class="iconfont">&#xe63d;</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/question">
        <span>刷题</span>
        <template #icon>
          <span class="iconfont">&#xe63f;</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/find">
        <span>发现</span>
        <template #icon>
          <span class="iconfont">&#xe63a;</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">
        <span>我的</span>
        <template #icon>
          <span class="iconfont">&#xe64b;</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.tabbar {
  .iconfont {
    font-size: 25px;
  }
}
</style>
