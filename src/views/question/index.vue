<template>
  <div class="qa">
    <van-dropdown-menu class="dropdown">
      <van-dropdown-item ref="dropdown" class="dropdown">
        <template #title>
          <span>面试宝典</span>
          <span class="city">{{ city }}</span>
        </template>
        <van-index-bar>
          <div v-for="(value, key) in list.citys" :key="key">
            <van-index-anchor :index="key" />
            <van-cell
              :value="item"
              v-for="(item, index2) in value"
              :key="index2"
              @click="selectCity(item)"
            />
          </div>
        </van-index-bar>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div class="tabs">
      <van-tabs
        v-model="active"
        title-active-color="#fff"
        title-inactive-color="#000"
      >
        <van-tab
          v-for="item in tabList"
          :key="item.id"
          :title="item.name"
          @click="btnClick(item)"
        ></van-tab>
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
      <div class="center">
        <van-circle
          v-model="currentRate"
          :rate="rate"
          :speed="100"
          layer-color="none"
          color="#ee5b7e"
        >
          <div class="text">
            <p>顺序刷题</p>
            <span style="margin-top: 10px">{{ complete }}/{{ total }}</span>
          </div>
        </van-circle>
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
      <h2>{{ total }}</h2>
    </div>
    <van-button
      type="primary"
      block
      class="btn"
      color="#00b8d4"
      @click="btnClick"
      >模拟面试</van-button
    >
  </div>
</template>

<script>
import { interviewFilters } from '@/api/interview'
export default {
  name: '',
  components: {},
  data () {
    return {
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      active: 0,
      currentRate: 0,
      list: [],
      city: '全国',
      tabList: [],
      complete: 0,
      total: 0,
      rate: 0
    }
  },
  methods: {
    async getInterviewData () {
      const res = await interviewFilters()
      this.list = res.data.data
      this.getTabList()
    },
    // 选择城市
    selectCity (item) {
      this.city = item
      this.getTabList()
      this.$refs.dropdown.toggle()
    },
    // 获取tab标签
    getTabList () {
      let code
      for (const key in this.list.cityPositions) {
        if (key === this.city) {
          code = key
          break
        }
      }

      this.tabList = this.list.cityPositions[code]
    },
    btnClick () {
      const item = this.tabList.find((item, index) => index === this.active)
      this.$router.push({
        path: '/question/topic',
        query: {
          type: item.id,
          city: this.city
        }
      })
    }
  },
  created () {
    this.getInterviewData()
    setTimeout(() => {
      const timer = setInterval(() => {
        this.complete++
        this.total++
        this.rate++
        if (this.complete > 58 && this.rate > 70 && this.total > 126) {
          this.complete = 58
          this.total = 126
          this.rate = 70
          clearInterval(timer)
        }
      }, 10)
    }, 2000)
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.qa {
  .dropdown {
    .city {
      font-size: 12px;
      margin-left: 5px;
    }
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
      .van-tab {
        padding-right: 5px;
      }
    }
  }
  .question {
    display: flex;
    align-items: center;
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
      width: 120px;
      height: 120px;
      background-image: url('~@/assets/images/bg.png');
      background-size: 100%;
      ::v-deep .van-circle {
        width: 100%;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(180deg, #ff6f92, #e40137);
        box-sizing: border-box;
        padding-top: 10px;
        color: #fff;
        font-size: 14px;
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

::v-deep .van-index-anchor {
  background-color: #f7f4f5;
  text-align: left;
}
</style>
