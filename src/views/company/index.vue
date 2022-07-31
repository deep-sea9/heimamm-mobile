<template>
  <div class="company" @scroll="setScroll" ref="company">
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
    <van-swipe :autoplay="3000" lazy-render class="titlePic">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <div class="category">
      <span>推荐</span>
      <div class="distance">
        <span>距离</span>
        <span class="icon">
          <i class="iconfont up" :style="{ color: distanceAsc ? 'red' : '' }"
            >&#xe64a;</i
          >
          <i
            class="iconfont"
            @click="filterCompany"
            :style="{ color: distanceDsc ? 'red' : '' }"
            >&#xe64a;</i
          >
        </span>
      </div>
      <div class="grade">
        <span>评分</span>
        <span class="icon">
          <i class="iconfont up" :style="{ color: scoreAsc ? 'red' : '' }"
            >&#xe64a;</i
          >
          <i class="iconfont" :style="{ color: scoreDsc ? 'red' : '' }"
            >&#xe64a;</i
          >
        </span>
      </div>
      <div @click="filters">筛选</div>
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
          <img :src="http + item.logo" alt="" />
        </div>
        <div class="rightInfo">
          <div class="infoTop">
            <span>{{ item.name }}</span>
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
        <div class="score">{{ item.score }}分</div>
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
      http: 'http://106.55.138.21:1337',
      list: [],
      loading: false,
      finished: false,
      scrollTop: 0,
      images: [
        'https://img.lianzhixiu.com/uploads/220629/1-220629143542Z6.JPG',
        require('@/assets/images/01.png')
      ],
      query: {
        start: 0,
        limit: 5
      },
      distanceDsc: false,
      distanceAsc: false,
      scoreDsc: false,
      scoreAsc: false
    }
  },
  created () {
    // this.getData()
  },
  activated () {
    this.$refs.company.scrollTop = this.scrollTop
  },
  methods: {
    filters () {
      this.$refs.show.show = true
    },
    // 获取公司数据
    async getData (query = this.query) {
      const res = await companiesList(query)
      // console.log('公司列表', res)
      // this.list = res.data.data.list
      this.loading = false
      this.list.push(...res.data.data.list)
      this.query.start = this.list.length
      if (this.list.length === res.data.data.total) {
        this.finished = true
      }
    },
    setNext (id) {
      // this.$bus.$emit('getId', id)
      this.$router.push('/details/' + id)
    },
    setScroll (e) {
      this.scrollTop = e.target.scrollTop
    },
    filterCompany () {
      this.list = []
      this.query.distance = 'desc'
      this.query.start = 0
      this.distanceDsc = true
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.company {
  background-color: #fff;
  height: 100vh;
  padding: 10px;
  padding-top: 50px;
  overflow-y: auto;
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
    img {
      width: 100%;
      height: 200px;
    }
  }
  .category {
    padding: 20px 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    .distance {
      margin: 0 40px;
      // display: inline-block;
      display: flex;
      align-items: center;
      span {
        position: relative;
        display: flex;
        flex-direction: column;
        i {
          width: 10px;
          height: 10px;
          font-size: 18px;
        }
        .up {
          position: absolute;
          left: 7px;
          bottom: 0;
          transform: rotate(-180deg);
        }
        &:nth-child(2) {
          margin-left: 5px;
        }
      }
    }
    .grade {
      display: flex;
      flex: 1;
      align-items: center;
      span {
        position: relative;
        display: flex;
        flex-direction: column;
        i {
          width: 10px;
          height: 10px;
          font-size: 18px;
        }
        .up {
          position: absolute;
          right: -7px;
          bottom: 0px;
          transform: rotate(-180deg);
        }
        &:nth-child(2) {
          margin-left: 5px;
        }
      }
    }
  }
  .info {
    display: flex;
    padding: 20px 0;
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
