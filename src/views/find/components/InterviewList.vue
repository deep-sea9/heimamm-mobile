<template>
  <!-- 面试技巧文章 -->
  <div class="InterviewList">
    <!-- 导航栏 -->
    <van-nav-bar title="面试技巧" @click-left="$router.push('/find')">
      <template #left>
        <i class="iconfont" style="font-size:40px;">&#xe637;</i>
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <div class="search">
      <i class="iconfont">&#xe647;</i>
      请输入关键字
    </div>
    <!-- loading加载 -->
    <!-- <van-loading
      size="24px"
      style="text-align: center;"
      v-if="list.length === 0"
    >
      加载中...</van-loading
    > -->
    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <div
        class="technic"
        v-for="(item, index) in list"
        :key="index"
        @click="$router.push('/InterviewInfo/' + item.id)"
      >
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="other">
            <span class="time">{{ item.updated_at | formatTime }}</span>
            <span class="watch"
              ><i class="iconfont">&#xe644;</i>{{ item.read }}</span
            >
            <span class="star"
              ><i class="iconfont">&#xe638;</i>{{ item.star }}</span
            >
          </div>
        </div>
        <div class="right">
          <img :src="'http://192.168.11.131:1337' + item.cover" alt="" />
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { articlesTechnic } from '@/api/find'
export default {
  name: '',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      start: 0
    }
  },
  created () {},
  methods: {
    async getData () {
      const res = await articlesTechnic({
        start: this.start,
        limit: 5
      })
      this.list = res.data.data.list
      this.loading = false
      this.list.push(...res.data.data.list)
      this.start += 1
      if (this.list.length === res.data.data.total) {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.InterviewList {
  background-color: #fff;
  height: 100vh;
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  ::v-deep .van-nav-bar__title {
    font-size: 19px;
    font-weight: 700;
  }
  .search {
    margin: 0 15px;
    height: 34px;
    color: #d4d3d3;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: #f7f4f5;
  }
  .technic {
    background-color: #fff;
    padding: 0 16px 42px 16px;
    display: flex;
    margin-top: 20px;
    .left {
      display: flex;
      height: 78px;
      width: 226px;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 17px;
        font-weight: 700;
      }
      .other {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #ccccd3;
        .time {
          flex: 1;
        }
        .watch {
          margin-right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .right {
      img {
        width: 117px;
        height: 78px;
        display: block;
      }
    }
  }
}
</style>
