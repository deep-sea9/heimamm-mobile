<template>
  <div class="position">
    <van-nav-bar @click-left="$router.back()">
      <template #left>
        <span class="iconfont left-arrow">&#xe637;</span>
      </template>
      <template #title>
        <div class="finding">在招职位 <span>50</span></div>
      </template>
    </van-nav-bar>
    <div class="condition">
      <div class="item active">全部</div>
      <div class="item">技术</div>
      <div class="item">教育培训</div>
      <div class="item">人事/财务/行政</div>
    </div>
    <div class="filter">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getPositionList"
    >
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="$router.push('/position/detail/' + item.id)"
      >
        <div class="left">
          <h3>{{ item.name }}</h3>
          <div class="tag">
            <span>{{ item.city }}</span>
            <span>{{ item.experience }}</span>
            <span>{{ item.education }}</span>
          </div>
        </div>
        <div class="right">{{ item.salary }}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { companiesPositions } from '@/api/com'
export default {
  name: '',
  data () {
    return {
      value1: 0,
      value2: 'a',
      value3: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      start: 0,
      loading: false,
      finished: false,
      list: []
    }
  },
  created () {
    // this.getPositionList()
  },
  methods: {
    async getPositionList () {
      const res = await companiesPositions({
        id: this.$route.params.id,
        limit: 5,
        start: this.start
      })
      // console.log(res)
      this.loading = false
      this.list.push(...res.data.data.list)
      this.start = this.list.length
      if (this.list.length === res.data.data.total) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.position {
  background-color: #fff;
  // height: 100vh;
  .van-nav-bar {
    .left-arrow {
      font-size: 45px;
      color: #000;
      font-weight: 500;
    }
    .finding {
      position: relative;
      font-weight: 600;
      font-size: 18px;
      padding: 5px 20px;
      span {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        font-weight: normal;
        color: #62637c;
      }
    }
  }
  .condition {
    display: flex;
    align-items: center;
    padding: 15px 15px 0;
    overflow-x: auto;
    .item {
      background-color: #f7f4f5;
      border-radius: 20px;
      padding: 10px 20px;
      color: #676981;
      margin-right: 10px;
      flex-shrink: 0;
      &.active {
        background-color: #00b8d4;
        color: #fff;
      }
    }
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
  .list {
    padding: 0 15px;
    .item {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: top;
      margin-bottom: 15px;
      .left {
        h3 {
          font-weight: 600;
          font-size: 18px;
        }
        .tag {
          margin-top: 20px;
          span {
            padding: 5px 8px;
            background-color: #f7f4f5;
            border-radius: 3px;
            margin-right: 10px;
          }
        }
      }
      .right {
        font-size: 18px;
        color: #e40c3f;
        margin-top: 5px;
      }
    }
  }
}
</style>
