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
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgsa.baidu.com%2Fbaike%2Fpic%2Fitem%2Ff2deb48f8c5494eecbee6a8524f5e0fe98257e59.jpg&refer=http%3A%2F%2Fimgsa.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661397301&t=9dd1368de2578f76f14635125da8b717"
        alt=""
      />
    </div>
    <div class="title">
      <div class="left">
        <span>推荐</span>
        <div class="distance">
          <span>距离</span>
          <i class="iconfont iconicon_paixu_shengxu"></i>
        </div>
        <span class="iconfont">距离&#xe65a;</span>
        <span class="iconfont">评分&#xe65a;</span>
      </div>
      <div class="screen">筛选</div>
    </div>

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
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <div
        class="info"
        v-for="item in list"
        :key="item.id"
        @click="setNext(item.id)"
      >
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
            ><span>/</span>最后更新时间:{{ item.updated_at | formatTime }}
          </p>
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
  .title {
    margin-top: 20px;
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
      font-size: 14px;
    }
    i {
      font-size: 15px;
    }
  }
  .info {
    margin-top: 15px;
    display: flex;
    padding-bottom: 50px;
    .pic {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightInfo {
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
        font-size: 18px;
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
}
</style>
