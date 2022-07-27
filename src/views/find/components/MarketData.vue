<template>
  <div class="MarketData">
    <!-- 市场数据 -->
    <van-cell-group>
      <van-cell
        title="市场数据"
        value="查看更多"
        is-link
        style="padding:20px 15px"
      />
    </van-cell-group>
    <div class="tags">
      <span>{{ list.city }}</span>
      <span>{{ list.position }}</span>
    </div>
    <div :class="brandFold ? 'items' : 'kele'">
      <!-- 循环遍历 -->
      <!-- :class="brandFold ? 'items' : 'kele'" -->
      <div class="item" v-for="(item, index) in list.yearSalary" :key="index">
        <div class="left">{{ item.year }}</div>
        <div class="center">
          <div class="inner" :style="{ width: width(item) }">
            ￥{{ item.sample }}
          </div>
        </div>
        <div class="right">
          <div>
            <i
              class="iconfont"
              :style="{ color: item.percent > 0 ? 'green' : 'red' }"
              >{{ item.percent > 0 ? '&#xe651;' : '&#xe64e;' }}</i
            >{{ item.percent }}%
          </div>
        </div>
      </div>
    </div>
    <div class="more" @click="more">
      {{ brandFold ? '查看更多' : '收起' }}
      <van-icon size="15px" :name="brandFold ? 'arrow-down' : 'arrow-up'" />
    </div>
  </div>
</template>
<script>
import { chartDataHot } from '@/api/find'
export default {
  name: '',
  data () {
    return {
      list: '',
      brandFold: true
    }
  },
  computed: {
    width (value) {
      return value => {
        let width = (value.sample / value.salary) * 100
        if (width > 100) {
          width = 100
        }
        return `${width}%`
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await chartDataHot()
      // console.log(res)
      this.list = res.data.data
      // 数组倒序
      this.list.yearSalary.reverse()
    },
    more () {
      this.brandFold = !this.brandFold
    }
  }
}
</script>
<style lang="less" scoped>
.MarketData {
  background-color: #fff;
  ::v-deep .van-cell__title {
    font-size: 17px;
    font-weight: 700;
  }
  .tags {
    padding: 0 15px;
    padding-bottom: 22px;
    span {
      font-size: 12px;
      padding: 4px;
      background-color: #eceaea;
      margin-right: 9px;
    }
  }
  .items {
    height: 156px;
    overflow: hidden;
    font-size: 12px;
    padding: 0 15px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 21px;
      .center {
        width: 240px;
        flex: 1;
        margin: 0 10px;
        border-radius: 4px;
        background-color: #ebdfdf;
        .inner {
          background-color: #fe6d67;
          border-radius: 4px;
          text-align: right;
          color: #fff;
          padding-right: 4.5px;
        }
      }
    }
  }
  .kele {
    font-size: 12px;
    padding: 0 15px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 21px;
      .center {
        width: 240px;
        flex: 1;
        margin: 0 10px;
        border-radius: 4px;
        background-color: #ebdfdf;
        .inner {
          background-color: #fe6d67;
          border-radius: 4px;
          text-align: right;
          color: #fff;
          padding-right: 4.5px;
        }
      }
    }
  }
  .more {
    font-size: 12px;
    text-align: center;
    padding-bottom: 21px;
    i {
      font-size: 12px;
      margin-left: 5px;
      color: #c1c1c8;
    }
  }
}
</style>
