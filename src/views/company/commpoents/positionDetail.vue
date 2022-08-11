<template>
  <div class="detail">
    <van-nav-bar @click-left="$router.back()">
      <template #left>
        <span class="iconfont left">&#xe637;</span>
      </template>
      <template #right>
        <div class="right">
          <span class="iconfont">&#xe63c;</span>
          <span class="iconfont">&#xe63e;</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="info">
        <div class="left">
          <h3>{{ info.name }}</h3>
          <div class="middle">
            <span> <i class="iconfont">&#xe601;</i>{{ info.city }}</span>
            <span> <i class="iconfont">&#xe603;</i>{{ info.experience }}</span>
            <span> <i class="iconfont">&#xe602;</i>{{ info.education }}</span>
          </div>
          <div class="weal">五险一金 · 弹性工作 · 不加班</div>
        </div>
        <div class="right">{{ info.salary }}</div>
      </div>
      <div
        class="content"
        v-html="info.responsibility"
        style="margin-top: 15px
      "
      ></div>
      <div class="company">
        <img
          class="picture"
          :src="'http://106.55.138.21:1337' + info.company.logo"
          alt=""
        />
        <div class="msg">
          <div class="name">{{ info.company.name }}</div>
          <div class="tag">
            <span>{{ info.company.type }}</span>
            <span>{{ info.company.step }}</span>
            <span>{{ info.company.scale }}</span>
          </div>
        </div>
        <span class="iconfont">&#xe653;</span>
      </div>
      <van-button
        type="danger"
        block
        style="margin-top: 15px;border-radius: 5px
      "
        >去刷题</van-button
      >
    </div>
  </div>
</template>

<script>
import { positionsDetail } from '@/api/com'
export default {
  name: '',
  data () {
    return {
      info: ''
    }
  },
  created () {
    this.getPosition()
  },
  methods: {
    async getPosition () {
      const res = await positionsDetail(this.$route.params.id)
      this.info = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  background-color: #fff;
  .van-nav-bar {
    .left {
      font-size: 45px;
      color: #000;
    }
    .right {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        margin-left: 25px;
      }
    }
  }
  .main {
    padding: 15px;
    .info {
      display: flex;
      justify-content: space-between;
      .left {
        h3 {
          font-size: 20px;
        }
        .middle {
          padding: 15px 0;
          span {
            margin-right: 10px;
            i {
              color: #b4b4bd;
              margin-right: 5px;
              font-size: 18px;
            }
          }
        }
        .weal {
          font-size: 14px;
          color: #b4b4bd;
        }
      }
      .right {
        font-size: 20px;
        margin-top: 10px;
        color: #e40137;
      }
    }
    .company {
      display: flex;
      align-items: center;
      margin-top: 15px;
      .picture {
        width: 60px;
        height: 60px;
        border-radius: 5px;
      }
      .msg {
        flex: 1;
        margin: 0 10px;
        .name {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .tag {
          span {
            padding: 5px;
            border: 1px solid #ccc;
            font-size: 12px;
            border-radius: 3px;
            margin-right: 5px;
          }
        }
      }
    }
    .content {
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>
