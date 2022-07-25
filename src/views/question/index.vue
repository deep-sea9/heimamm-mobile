<template>
  <div class="qa">
    <van-nav-bar>
      <template #title>
        <div class="title">
          <span>面试宝典</span>
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="标签 1"></van-tab>
      <van-tab title="标签 2"></van-tab>
      <van-tab title="标签 3"></van-tab>
      <van-tab title="标签 4"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.qa {
  .title {
    display: flex;
    align-items: center;
    text-align: center;
  }
  ::v-deep .van-tabs__nav {
    background-color: #fdfdfd;
  }
}
</style>
