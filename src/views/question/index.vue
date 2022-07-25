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
    <div class="tabs">
      <van-tabs
        v-model="active"
        title-active-color="#fff"
        title-inactive-color="#000"
      >
        <van-tab title="标签 1"></van-tab>
        <van-tab title="标签 2"></van-tab>
        <van-tab title="标签 3"></van-tab>
        <van-tab title="标签 4"></van-tab>
      </van-tabs>
    </div>
    <div class="question">
      <div class="item">
        <div class="tiku">
          <div class="iconfont">&#xe64f;</div>
          <span>常错题库</span>
        </div>
        <div class="tiku">
          <div class="iconfont" style="background-color: #00cae0">&#xe648;</div>
          <span>企业题库</span>
        </div>
      </div>
      <div class="item center">
        <div class="circle">
          <van-circle v-model="currentRate" :rate="30" :speed="100">
            <!-- <div class="text">
              <p>顺序刷题</p>
              <span>58/126</span>
            </div> -->
          </van-circle>
        </div>
      </div>
      <div class="item">
        <div class="tiku">
          <div class="iconfont" style="background-color: #ffbd03">&#xe654;</div>
          <span>收藏题库</span>
        </div>
        <div class="tiku">
          <div class="iconfont" style="background-color: #1fc97d">&#xe655;</div>
          <span>已答题库</span>
        </div>
      </div>
    </div>
    <div class="total">
      <p>累计收录</p>
      <h2>126</h2>
    </div>
    <van-button type="primary" block class="btn" color="#00b8d4"
      >模拟面试</van-button
    >
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
      active: 0,
      currentRate: 0
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
  .tabs {
    background-color: #fdfdfd;
    padding: 10px 0;
    ::v-deep .van-tabs__nav {
      .van-tab__text {
        padding: 3px 10px;
        background-color: #f7f4f5;
        border-radius: 15px;
        font-size: 12px;
      }
      .van-tab--active {
        .van-tab__text {
          background-color: #00b8d4;
        }
      }
      .van-tabs__line {
        display: none;
      }
    }
  }
  .question {
    display: flex;
    height: 200px;
    background-color: #fff;
    margin-top: 15px;
    .item {
      flex: 1;
      height: 100%;
      text-align: center;
      .tiku {
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont {
          width: 50px;
          height: 50px;
          background-color: #ff5353;
          font-size: 25px;
          color: #fff;
          line-height: 50px;
          border-radius: 50%;
        }
        span {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
    .center {
      position: relative;

      .circle {
        position: absolute;
        width: 120px;
        height: 120px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-image: url('~@/assets/images/bg.png');
        background-size: 100%;
        padding: 5px;
      }
      ::v-deep .van-circle {
        width: 100%;
        height: 100%;
      }
      .text {
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(180deg, #ff6f92, #e40137);
      }
    }
  }
  .total {
    height: 130px;
    background-color: #fff;
    margin-top: 15px;
    text-align: center;
    padding-top: 30px;
    p {
      text-align: center;
      font-weight: 700;
    }
    h2 {
      margin-top: 20px;
    }
  }
  .btn {
    width: 90%;
    margin: 15px auto;
    font-size: 16px;
    border-radius: 5px;
  }
}
</style>
