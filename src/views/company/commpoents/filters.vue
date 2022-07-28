<template>
  <div class="filters">
    <van-popup
      class="pop"
      v-model="show"
      position="top"
      @click-overlay="show = false"
    >
      <div class="title">
        <div class="left">
          <span>推荐</span>
          <div class="distance">
            <span>距离</span>
            <i class="iconfont iconicon_paixu_shengxu"></i>
          </div>
          <div class="score">
            <span>评分</span>
            <i class="iconfont iconicon_paixu_shengxu"></i>
          </div>
        </div>
        <span class="right">筛选</span>
      </div>
      <div class="distanceInfo">
        <h3>距离</h3>
        <div class="distanceBtn">
          <van-button class="distanceItem1">由远到近</van-button>
          <van-button class="distanceItem2">由近到远</van-button>
        </div>
      </div>
      <div class="scoreInfo">
        <h3>评分</h3>
        <div class="scoreBtn">
          <div class="btnLeft">
            <van-button class="item">4分-5分</van-button>
            <van-button class="item">2分-2.9分</van-button>
            <van-button class="item">1分以下</van-button>
          </div>
          <div class="btnRight">
            <van-button class="item">3分-3.9分</van-button>
            <van-button class="item">1分-1.9分</van-button>
          </div>
        </div>
      </div>
      <div class="footer">
        <van-button class="del">清除</van-button>
        <van-button class="submit" type="danger">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.filters {
  overflow-x: auto;
}
::v-deep .van-overlay {
  top: 60px;
}
.van-popup--top {
  top: 60px;
}
.pop {
  padding: 15px;
  box-sizing: border-box;
}
.title {
  margin-top: 10px;
  display: flex;
  align-items: center;
  .distance {
    margin: 0 40px;
    display: inline-block;
  }
  .score {
    flex: 1;
    display: inline-block;
  }
  .right {
    flex: 1;
    text-align: right;
  }
  span {
    font-size: 15px;
  }
  i {
    font-size: 15px;
  }
}
.distanceInfo {
  h3 {
    font-size: 17px;
    margin: 6px 0;
  }
  .distanceBtn {
    display: flex;
    padding: 10px 0;
    .distanceItem1,
    .distanceItem2 {
      flex: 1;
      height: 40px;
      border-radius: 10px;
      background-color: #f9f8f8;
    }
    .distanceItem1 {
      margin-right: 10px;
    }
    .active {
      background-color: red;
    }
  }
}
.scoreInfo {
  h3 {
    font-size: 18px;
    margin: 6px 0;
  }
  .scoreBtn {
    display: flex;
    .btnLeft,
    .btnRight {
      flex: 1;
      display: flex;
      flex-direction: column;
      .item {
        height: 40px;
        border-radius: 10px;
        background-color: #f9f8f8;
        &:nth-child(2) {
          margin: 10px 0;
        }
      }
    }
    .btnLeft {
      margin-right: 10px;
    }
  }
}
.footer {
  margin-top: 20px;
  display: flex;
  .del {
    width: 150px;
    color: red;
    margin-right: 10px;
    background-color: #ffe2e9;
    border-radius: 5px;
  }
  .submit {
    flex: 1;
    border-radius: 5px;
  }
}
</style>
