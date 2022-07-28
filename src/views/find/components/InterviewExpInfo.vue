<template>
  <!-- 面经分享文章详情 -->
  <div class="InterviewExpInfo" v-if="list.length !== 0">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.push('/find')">
      <template #left>
        <i class="iconfont" style="font-size:40px;">&#xe637;</i>
      </template>
    </van-nav-bar>
    <!-- 文章详情 -->
    <div class="info">
      <div class="title">
        {{ list.title }}
      </div>
      <div class="author">
        <img :src="'http://192.168.11.131:1337' + list.author.avatar" alt="" />
        <div class="other">
          <div class="name">{{ list.author.nickname }}</div>
          <div class="time">{{ list.created_at | formatTime }}</div>
        </div>
      </div>
      <div class="content" v-html="list.content"></div>
      <!-- 评论盒子 -->
      <div class="comment">
        <div class="title">
          评论
          <sup>{{ total }}</sup>
        </div>
        <!-- 下拉加载 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getComments"
        >
          <div
            class="commenCom"
            v-for="(item, index) in commmentsList"
            :key="index"
          >
            <!-- 用户头像以及名字时间和点赞数量 -->
            <div class="top">
              <img
                :src="'http://192.168.11.131:1337' + item.author.avatar"
                alt=""
              />
              <div class="user">
                <div class="name">{{ item.author.nickname }}</div>
                <div class="time">{{ item.created_at | formatTime }}</div>
              </div>
              <div class="star">
                {{ item.star }}
                <i class="iconfont">&#xe638;</i>
              </div>
            </div>
            <!-- 用户评论内容 -->
            <div class="center">
              {{ item.content }}
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <!-- 我来补充两句盒子 -->
    <div class="write">
      <div class="input" @click="show = true">我来补充两句</div>
      <div class="item">
        <i class="iconfont">&#xe63c;</i>
        <span>2</span>
      </div>
      <div class="item">
        <i class="iconfont">&#xe639;</i>
        <span>10</span>
      </div>
      <div class="item">
        <i class="iconfont">&#xe63e;</i>
        <span>10</span>
      </div>
    </div>
    <!-- 评论弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="myinput">
        <textarea
          cols="30"
          ref="textarea"
          rows="10"
          placeholder="我也来说两句"
        ></textarea>
        <div class="btn" @click="btnClick">
          <span>发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  articlesShareId,
  articlesCommentsId,
  articlesComments
} from '@/api/find'
export default {
  name: '',
  data () {
    return {
      // 文章数据
      list: [],
      // 评论数据
      commmentsList: [],
      loading: false,
      finished: false,
      start: 0,
      // 评论弹出层的显示与隐藏
      show: false,
      // 评论总数
      total: 0
    }
  },
  created () {
    // 获取文章详情
    this.getData()
  },
  methods: {
    // 获取文章数据
    async getData () {
      const res = await articlesShareId(this.$route.params.id)
      this.list = res.data.data
    },
    // 获取文章评论数据
    async getComments () {
      const res = await articlesCommentsId({
        id: this.$route.params.id,
        limit: 5,
        start: this.start
      })
      this.loading = false
      this.commmentsList.push(...res.data.data.list)
      this.start = this.commmentsList.length
      this.total = res.data.data.total
      if (this.commmentsList.length === res.data.data.total) {
        this.finished = true
      }
    },
    // 发布评论
    async btnClick () {
      const res = await articlesComments({
        content: this.$refs.textarea.value,
        article: this.$route.params.id
      })
      this.commmentsList.unshift(res.data.data)
      this.total++
      this.show = false
      // 清空输入框
      this.$refs.textarea.value = ''
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
  // 我来补充两句
  .write {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 0 15px;
    padding-top: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    .input {
      flex: 1;
      background-color: #f7f4f5;
      height: 34px;
      color: #ccc;
      line-height: 34px;
      padding-left: 10px;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 20px;
      i {
        font-size: 25px;
      }
    }
  }
  .comment {
    padding-bottom: 50px;
    // 评论盒子
    .commenCom {
      padding: 0 15px;
      font-size: 12px;
      margin-top: 20px;
      .top {
        display: flex;
        align-items: center;
        img {
          border-radius: 50%;
          width: 34px;
          height: 34px;
          margin-right: 10px;
        }
        .user {
          flex: 1;
          .name {
            font-weight: 700;
          }
          .time {
            color: #ccc;
          }
        }
        .star {
          font-size: 12px;
        }
      }
      .center {
        font-size: 14px;
        padding: 10px 0;
        padding-left: 44px;
        // 换行
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  // 评论弹出层
  .myinput {
    padding: 20px 15px;
    textarea {
      border: none;
      background-color: #f7f4f5;
      height: 90px;
      width: 100%;
      font-size: 12px;
      padding: 8px;
      resize: none;
    }
    .btn {
      text-align: right;
      font-size: 14px;
    }
  }
}
</style>
