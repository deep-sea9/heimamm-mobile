<template>
  <div class="InterviewExperience">
    <!-- 面经分享 -->
    <van-cell-group>
      <van-cell
        title="面经分享"
        value="查看更多"
        is-link
        to="/shareList"
        style="padding:20px 15px"
      />
    </van-cell-group>
    <div
      class="shareItem"
      v-for="(item, index) in list.slice(0, 3)"
      :key="index"
      @click="$router.push('/InterviewExpInfo/' + item.id)"
    >
      <div class="title">{{ item.title }}</div>
      <div class="content">
        {{ item.content }}
      </div>
      <div class="other">
        <span class="user">
          <img :src="'http://106.55.138.21:1337' + item.author.avatar" alt="" />
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
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await articlesShare()
      this.list = res.data.data.list
      console.log(this.list)
    }
  }
}
</script>
<style lang="less" scoped>
.InterviewExperience {
  ::v-deep .van-cell__title {
    font-size: 17px;
    font-weight: 700;
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
