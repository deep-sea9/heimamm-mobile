<template>
  <div class="company">
    <div class="header">
      <span class="companyName">公司</span>
      <i class="iconfont iconicon_search searchIcon"></i>
      <van-search
        class="search"
        shape="round"
        input-align="center"
        placeholder="请输入关键字"
      ></van-search>
    </div>
    <div class="titlePic">
      <img
        src="https://img.lianzhixiu.com/uploads/220629/1-220629143542Z6.JPG"
        alt=""
      />
    </div>
    <div class="category">
      <span>推荐</span>
      <span class="distance">距离 <i class="iconfont">&#xe65a;</i></span>
      <span class="grade">评分 <i class="iconfont">&#xe65a;</i></span>
      <span>筛选</span>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <div class="info" v-for="(item, index) in list" :key="index">
        <div class="pic">
          <img :src="'http://192.168.11.131:1337' + item.logo" alt="" />
        </div>
        <div class="rightInfo">
          <div class="infoTop">
            <span>{{ item.name }}</span>
            <span>{{ item.score }}分</span>
          </div>
          <div class="score">
            <span>评分</span>
            <i class="iconfont iconicon_paixu_shengxu"></i>
          </div>
        </div>
        <span class="right" @click="filters">筛选</span>
        <div class="category">
          <span>推荐</span>
          <span class="distance">距离 <i class="iconfont">&#xe65a;</i></span>
          <span class="grade">评分 <i class="iconfont">&#xe65a;</i></span>
          <span>筛选</span>
        </div>
      </div>
    </van-list>
    <Filters ref="show"></Filters>
  </div>
</template>

<script>
import Filters from './commpoents/filters.vue'
import { companiesList } from '@/api/com'
export default {
  components: {
    Filters
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      start: 0
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    filters () {
      this.$refs.show.show = true
    },
    // 获取公司数据
    async getData () {
      const res = await companiesList({
        start: this.start,
        limit: 5
      })
      // console.log('公司列表', res)
      // this.list = res.data.data.list
      this.loading = false
      this.list.push(...res.data.data.list)
      this.start = this.list.length
      if (this.list.length === res.data.data.total) {
        this.finished = true
      }
    },
    setNext (id) {
      // this.$bus.$emit('getId', id)
      this.$router.push('/details/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.company {
  background-color: #fff;
  height: 100vh;
  padding: 10px;
  .header {
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #fff;
    width: 100%;
    position: fixed !important;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    .companyName {
      font-size: 20px;
      font-weight: 700;
    }
    position: relative;
    .search {
      flex: 1;
    }
    .searchIcon {
      position: absolute;
      left: 150px;
      top: 15px;
      color: #c3c2c8;
      font-size: 20px;
    }
  }
  ::v-deep .van-icon {
    display: none;
  }
  .titlePic {
    padding-top: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .category {
    margin: 25px 0 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    .distance {
      margin: 0 40px;
      display: inline-block;
    }
    .grade {
      flex: 1;
    }
  }
  .info {
    display: flex;
    padding: 30px 0;
    border-bottom: 1px solid #f7f4f5;
    .pic {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightInfo {
      flex: 1;
      margin-left: 10px;
      .infoTop {
        display: flex;
        align-items: center;
        span {
          &:nth-child(1) {
            font-weight: 700;
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
        font-size: 14px;
        margin: 10px 0;
      }
      .pInfo {
        margin-top: 10px;
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
        span {
          padding: 5px;
          color: #bab9c2;
          font-size: 14px;
          background-color: #f7f4f5;
          border-radius: 5px;
        }
        .B {
          margin: 0 8px;
        }
      }
    }
    .score {
      font-size: 14px;
      color: #595b75;
    }
  }
}
</style>
