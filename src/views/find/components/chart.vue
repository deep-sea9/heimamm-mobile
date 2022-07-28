<template>
  <div class="chart">
    <van-nav-bar
      title="市场数据"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="select">
      <van-dropdown-menu>
        <van-dropdown-item ref="citymenu">
          <template #title>
            <span>{{ city }}</span>
          </template>
          <van-search
            shape="round"
            background="#f6f3f4"
            placeholder="请输入搜索关键词"
          />
          <div v-for="(value, key) in cityList" :key="key">
            <van-index-bar>
              <van-index-anchor :index="key" />
              <van-cell
                v-for="(city, i2) in value"
                :key="i2"
                :title="city[0]"
                @click="selectCity(city)"
              />
            </van-index-bar>
          </div>
        </van-dropdown-item>
        <van-dropdown-item ref="jobmenu">
          <template #title>
            <div>{{ job }}</div>
          </template>
          <van-search
            shape="round"
            background="#f6f3f4"
            placeholder="请输入搜索关键词"
          />
          <van-cell-group>
            <van-cell
              v-for="(item, index) in jobList"
              :key="index"
              :value="item"
              @click="selectJoy(item)"
            />
          </van-cell-group>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="data_chart">
      <h3>工资收入</h3>
      <div class="charts" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import { chartDataIndexes, chartDataStatistics } from '@/api/find'

export default {
  name: '',
  data () {
    return {
      cityList: '',
      city: '北京',
      jobList: [],
      job: '技术经理'
    }
  },
  created () {
    this.getCityList()
  },
  mounted () {
    this.getStatistics()
  },
  methods: {
    async getCityList () {
      const res = await chartDataIndexes()
      this.cityList = res.data.data
    },
    selectCity (city) {
      this.city = city[0]
      this.jobList = city[1]
      this.job = this.jobList[0]
      this.$refs.citymenu.toggle()
      this.getStatistics()
    },
    selectJoy (item) {
      this.job = item
      this.$refs.jobmenu.toggle()
      this.getStatistics()
    },
    async getStatistics () {
      const res = await chartDataStatistics({
        city: this.city,
        position: this.job
      })
      const arr = res.data.data.percentSalary.map(item => {
        return {
          name: item.assetType,
          value: item.percent
        }
      })
      const mychart = this.$echarts.init(this.$refs.chart)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: arr
          }
        ]
      }
      mychart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-index-anchor {
  background: #f7f4f5;
}
::v-deep .van-search__content {
  background-color: #fff;
}
.chart {
  .data_chart {
    padding: 0 15px;
    margin-top: 15px;
    .charts {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
