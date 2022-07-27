<template>
  <div class="bigbox">
    <div class="top">
      <h3>公司</h3>
      <van-search
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
      />
    </div>

    <div class="main">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image
            width="100vh"
            height="150"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </van-swipe-item>
        <van-swipe-item
          ><van-image
            width="100vh"
            height="150"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        /></van-swipe-item>
        <van-swipe-item
          ><van-image
            width="100vh"
            height="150"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        /></van-swipe-item>
        <van-swipe-item
          ><van-image
            width="100vh"
            height="150"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        /></van-swipe-item>
      </van-swipe>
    </div>

    <div class="recommend" style="height: 50">
      <div class="FONT">
        <span>推荐</span>

        <span class="iconfont">距离&#xe65a;</span>
        <span class="iconfont">评分&#xe65a;</span>
      </div>
      <div class="screen">筛选</div>
    </div>

    <div class="info" v-for="(item, index) in list" :key="index">
      <div class="pic">
        <img :src="'http://106.55.138.21:1337' + item.logo" alt="" />
      </div>
      <div class="rightInfo">
        <div class="infoTop">
          <span>{{ item.name }}</span>
          <span>{{ item.score }}分</span>
        </div>
        <p class="address">
          <span>{{ item.region }}</span>
          <span>{{ item.distance }}</span>
        </p>
        <div class="infoBtn">
          <span>{{ item.type }}</span>
          <span class="B">{{ item.step }}</span>
          <span>{{ item.scale }}</span>
        </div>
        <p class="pInfo">
          在招职位: <span>{{ item.positions }}</span
          ><span>/</span>最后更新时间:
          <span>{{ item.updated_at | formatTime }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { companieslist } from '@/api/com'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getcompanieslist () {
      const res = await companieslist()
      console.log('公司列表', res)
      this.list = res.data.data.list
    }
  },
  created () {
    this.getcompanieslist()
  }
}
</script>
<style lang="less" scoped>
.bigbox {
  height: 999px;
  padding: 0 15px;
  background-color: #fff;
}
.top {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
  h3 {
    width: 60px;
    padding-left: 10px;
  }
  .van-search {
    width: 48vh;
  }
}
.recommend {
  margin: 15px 0;

  display: flex;
  justify-content: space-between;

  .FONT {
    display: flex;
    width: 25vh;
    justify-content: space-between;
  }
}
.info {
  border-bottom: 1px solid #d8d9e4;
  margin-top: 25px;
  display: flex;
  .pic {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .rightInfo {
    width: 77%;
    margin-left: 10px;
    .infoTop {
      font-size: 15px;
      display: flex;
      align-items: center;
      span {
        &:nth-child(1) {
          font-weight: 600;
          font-size: 20px;
        }
        &:nth-child(2) {
          flex: 1;
          color: #8b8d9f;
          text-align: right;
        }
      }
    }

    .address {
      font-size: 15px;
      margin: 10px 0;
    }
    .pInfo {
      margin: 15px 0;
      font-size: 12px;
      color: #bab9c2;
      span {
        &:nth-child(1) {
          color: #5cd1e3;
        }
        &:nth-child(2) {
          margin: 0 8px;
        }
      }
    }
    .infoBtn {
      margin-top: 15px;
      span {
        border-radius: 3px;
        padding: 3px;
        color: #bab9c2;
        background-color: #f7f4f5;
      }
      .B {
        margin: 0 5px;
      }
    }
  }
}
</style>
