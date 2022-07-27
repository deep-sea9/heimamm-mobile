<template>
  <div class="mine">
    <div class="top">
      <div class="top_NT">
        <div class="fontS">
          <h3>{{ info.nickname }}</h3>
          <p>{{ info.intro }}</p>
        </div>
        <img
          class="photo"
          :src="http + info.avatar"
          alt=""
          @click="$router.push('/info')"
        />
      </div>
      <div class="Statistics">
        <div class="answer">
          <h3>{{ info.submitNum }}</h3>
          <p>累计答题</p>
        </div>
        <div v-if="info.collectArticles" class="subject">
          <h3>{{ info.collectArticles.length }}</h3>
          <p>收藏题目</p>
        </div>
        <div class="wrong">
          <h3>{{ info.errorNum }}</h3>
          <p>我的错题</p>
        </div>
        <div class="correct">
          <h3>
            {{
              (
                ((info.submitNum - info.errorNum) / info.submitNum) *
                100
              ).toFixed(2)
            }}%
          </h3>
          <p>正确率</p>
        </div>
      </div>
    </div>
    <div class="modular">
      <van-cell
        title="我的岗位"
        value="世界最"
        is-link
        @click="$router.push('/mine/post/position')"
      >
        <template #icon>
          <span class="iconfont">&#xe64d;</span>
        </template>
      </van-cell>
      <van-cell>
        <h4>面经数据</h4>
        <div class="data">
          <div class="zhong">
            <p>昨晚阅读<span>+0</span></p>
            <h2>39</h2>
            <span>阅读总数</span>
          </div>
          <div class="zhong">
            <p>昨晚获赞<span>+0</span></p>
            <h2>7</h2>
            <span>获赞总数</span>
          </div>
          <div class="zhong">
            <p>昨晚新增<span>+0</span></p>
            <h2>11</h2>
            <span>评论总数</span>
          </div>
        </div>
      </van-cell>
      <van-cell-group>
        <van-cell title="我的面经分享" value="21" is-link>
          <template #icon>
            <span class="iconfont">&#xe64d;</span>
          </template>
        </van-cell>
        <van-cell title="我的消息" value="21" is-link>
          <template #icon>
            <span class="iconfont">&#xe64d;</span>
          </template>
        </van-cell>
        <van-cell title="收藏的题库" value="21" is-link>
          <template #icon>
            <span class="iconfont">&#xe64d;</span>
          </template>
        </van-cell>
        <van-cell title="收藏的企业" value="21" is-link>
          <template #icon>
            <span class="iconfont">&#xe64d;</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { auInfo } from '@/api/mine.js'
export default {
  name: '',
  data () {
    return {
      info: '',
      http: 'http://106.55.138.21:1337'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await auInfo()
      this.info = res.data.data
      console.log('获取用户数据：', this.info)
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  background-color: #f7f4f5;
  .top {
    width: 100%;
    height: 210px;
    background-color: #c6002f;
    .top_NT {
      display: flex;
      padding: 40px 20px 30px;
      align-items: center;
      .fontS {
        flex: 1;
        h3 {
          color: #fff;
          font-weight: 400;
        }
        p {
          margin-top: 10px;
          font-size: 12px;
          color: #eba4b5;
        }
      }
      .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .Statistics {
      display: flex;
      justify-content: space-evenly;
      text-align: center;
      h3 {
        color: #fff;
        font-weight: 500;
      }
      p {
        color: #eba4b5;
        margin-top: 10px;
        font-size: 12px;
      }
    }
    // ::v-deep .van-cell--clickable {
    //   margin: auto;
    //   width: 80%;
    //   background-color: green;
    //   position: fixed;
    //   margin-top: 20px;
    // }
  }
  .modular {
    margin-top: -40px;
    padding: 0 20px 50px;
    ::v-deep .van-cell {
      margin-top: 10px;
      border-radius: 10px;
    }
    &:nth-child(2) {
      height: 500px;
    }
    h4 {
      padding-top: 10px;
    }
    .data {
      display: flex;
      justify-content: space-around;
      // align-items: center;
      text-align: center;
      .zhong {
        padding: 10px 0;
      }
      p {
        color: #cebbbd;
        font-size: 13px;
        span {
          color: #8be1ef;
        }
      }
      h2 {
        font-weight: 400;
      }
      span {
        font-size: 13px;
      }
    }
  }
}
</style>
