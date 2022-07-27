<template>
  <div class="InterviewExpInfo" v-if="list.length !== 0">
    <van-nav-bar @click-left="$router.push('/find')">
      <template #left>
        <i class="iconfont" style="font-size:40px;">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="info">
      <div class="title">
        {{ list.title }}
      </div>
      <div class="author">
        <img :src="'http://106.55.138.21:1337' + list.author.avatar" alt="" />
        <div class="other">
          <div class="name">{{ list.author.nickname }}</div>
          <div class="time">{{ list.created_at | formatTime }}</div>
        </div>
      </div>
      <div class="content" v-html="list.content"></div>
      <div class="write">
        <div class="input">我来补充两句</div>
      </div>
    </div>
  </div>
</template>
<script>
import { articlesShareId } from '@/api/find'
export default {
  name: '',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await articlesShareId(this.$route.params.id)
      console.log(res)
      this.list = res.data.data
    }
  }
}
</script>
<style lang="less" scoped>
.InterviewExpInfo {
  background-color: #fff;
  height: 100vh;
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  .title {
    padding: 15px;
    font-size: 16px;
  }
  .author {
    padding: 0 15px;
    display: flex;
    align-items: center;
    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .other {
      .name {
        font-weight: 700;
        font-size: 12px;
      }
      .time {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .content {
    margin-top: 20px;
    font-size: 14px;
    padding: 0 15px;
    ::v-deep ul {
      li {
        margin: 14px 0;
      }
    }
  }
}
</style>
