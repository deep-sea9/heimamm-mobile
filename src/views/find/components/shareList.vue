<template>
  <div class="shareList">
    <!-- 导航栏 -->
    <van-nav-bar title="我分享的面经" @click-left="$router.push('/find')">
      <template #left>
        <i class="iconfont" style="font-size:40px;">&#xe637;</i>
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <div class="search" @click="shareSearch">
      <i class="iconfont">&#xe647;</i>
      请输入关键字
    </div>
    <!-- loading 加载 -->
    <van-loading
      size="24px"
      style="text-align: center;"
      v-if="list.length === 0"
    >
      加载中...</van-loading
    >
    <!-- 列表 -->
    <div class="shareItem" v-for="(item, index) in list" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="content">
        {{ item.content }}
      </div>
      <div class="other">
        <span class="user">
          <img
            :src="'http://192.168.11.131:1337' + item.author.avatar"
            alt=""
          />
          {{ item.author.nickname }}
        </span>
        <span class="time">{{ item.updated_at | formatTime }}</span>
        <span class="comment">
          <i class="iconfont">&#xe65b;</i>
          {{ item.article_comments }}
        </span>
        <span class="star">
          <i class="iconfont">&#xe638;</i>
          {{ item.star }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { articlesShare } from '@/api/find'
export default {
  name: '',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await articlesShare()
      this.list = res.data.data.list
    },
    shareSearch () {
      this.$router.push('/shareSearch')
    }
  }
}
</script>
<style lang="less" scoped>
.shareList {
  height: 100vh;
  background-color: #fff !important;
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
  .shareItem {
    margin: 0 15px;
    padding: 17px 0 26px 0;
    .title {
      height: 23px;
      font-size: 16px;
      font-weight: 700;
      font-family: PingFangSC, PingFangSC-Medium;
      color: #181a39;
      line-height: 23px;
    }
    .content {
      font-size: 14px;
      color: #6d6f86;
      margin: 10px 0 20px 0;
      line-height: 18px;
      display: -webkit-box;
      -webkit-box-orient: vertical; /* Safari */
      -webkit-line-clamp: 2; /* 设置最多显示行数 */
      overflow: hidden;
    }
    .other {
      color: #bdbdc5;
      display: flex;
      font-size: 12px;
      align-items: center;
      .user {
        flex: 2;
        display: flex;
        align-items: center;
        img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .time {
        flex: 1;
      }
      .comment {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .star {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
