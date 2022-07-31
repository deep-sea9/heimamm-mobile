<template>
  <div class="chart">
    <van-nav-bar
      title="市场数据"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="select">
      <van-dropdown-menu>
        <van-dropdown-item ref="citymenu" :title="city">
          <van-search
            shape="round"
            background="#f6f3f4"
            placeholder="请输入搜索关键词"
          />
          <!-- <div v-for="(value, key) in cityList" :key="key"> -->
          <van-index-bar>
            <template v-for="(value, key) in cityList">
              <van-index-anchor :key="key" :index="key"> </van-index-anchor>
              <van-cell
                v-for="city in value"
                :key="city[0] + key"
                :title="city[0]"
                @click="selectCity(city)"
              />
            </template>
          </van-index-bar>
          <!-- </div> -->
        </van-dropdown-item>
        <van-dropdown-item ref="jobmenu" v-model="job" :title="job">
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
      <!-- 工资收入 -->
      <div class="salary_box">
        <div>工资收入</div>
        <div class="salary_chart">
          <div class="charts" ref="chart"></div>
          <div class="info">
            <p>平均工资</p>
            <p>￥11200</p>
          </div>
        </div>
        <p class="tip">近1年 {{ salary }} 份样本/可信度: 高</p>
      </div>
      <!-- 工作经验 -->
      <div class="experience">
        <div>工作经验</div>
        <div class="experience_chart" ref="expChart"></div>
      </div>
      <!-- 历史平均工资变化趋势 -->
      <div class="salary_change">
        <div>历史平均工资变化趋势</div>
        <div class="change_chart" ref="salaryChart"></div>
      </div>
      <!-- 就业形势 -->
      <div class="job_find">
        <div>就业形势</div>
        <div class="job_chart" ref="jobChart"></div>
        <div class="info">
          <p><van-icon name="warning-o" />说明</p>
          <div>
            曲线越向上代表市场需求量越大，就业情况越好。反之，代表该类职位需求量较少。
            该数据由各地招聘网站统计而来，可能因抓取系统稳定性等因素而致使数据偏离客观实情，仅供参考。
          </div>
        </div>
      </div>
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
      city: '',
      jobList: [],
      job: '',
      positionList: [],
      // 平均工资
      salary: 0
    }
  },
  async created () {},
  mounted () {
    this.getCityList()
  },
  methods: {
    async getCityList () {
      const res = await chartDataIndexes()
      console.log(res.data)
      this.cityList = res.data.data
      // 默认选中第一个
      const cityData = res.data.data['热门'][0]
      this.city = cityData[0]
      this.jobList = cityData[1]
      this.job = cityData[1][0]
      await this.getStatistics()
      // console.log(this.city, this.job)
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
      this.salary = res.data.data.percentSample
      this.setPieChart(res.data.data.percentSalary)
      this.setWorkExpChart(res.data.data.experienceSalary)
      this.setSalaryChart(res.data.data.yearSalary)
      this.setJobChart(res.data.data.employmentNum)
    },
    // 工资收入统计图
    setPieChart (percentSalary) {
      const arr = percentSalary.map(item => {
        return {
          name: item.assetType,
          value: item.percent
        }
      })
      const mychart = this.$echarts.init(this.$refs.chart)
      const option = {
        grid: {
          left: '10%',
          top: '10%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          right: '0%',
          top: '15%',
          align: 'auto',
          orient: 'vertical'
        },
        series: [
          {
            color: ['#73a0fa', '#73deb3', '#7585a2', '#eb7e65', '#f7c739'],
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
            data: arr,
            left: '0%'
          }
        ]
      }
      mychart.setOption(option)
    },
    // 工作经验统计图
    setWorkExpChart (experienceSalary) {
      const xLabel = experienceSalary.map(item => item.info)
      const salary = experienceSalary.map(item => item.value)
      const mychart = this.$echarts.init(this.$refs.expChart)
      const option = {
        grid: {
          left: '15%',
          bottom: '10%',
          top: '10%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xLabel,
          axisLabel: {
            fontSize: 10,
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLabel: {
            fontSize: 10
          }
        },
        series: [
          {
            data: salary,
            type: 'line',
            areaStyle: {
              color: '#e5f8fb'
            },
            lineStyle: {
              color: '#00b8d4'
            }
          }
        ]
      }
      mychart.setOption(option)
    },
    // 工资变化趋势统计图
    setSalaryChart (yearSalary) {
      const xLabel = yearSalary.map(item => item.year.split('年')[0])
      const salary = yearSalary.map(item => item.salary)
      const mychart = this.$echarts.init(this.$refs.salaryChart)
      const option = {
        grid: {
          left: '15%',
          bottom: '10%',
          top: '10%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xLabel,
          axisLabel: {
            fontSize: 10,
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLabel: {
            fontSize: 10
          }
        },
        series: [
          {
            data: salary,
            type: 'line',
            areaStyle: {
              color: '#e5f8fb'
            },
            lineStyle: {
              color: '#00b8d4'
            }
          }
        ]
      }
      mychart.setOption(option)
    },
    setJobChart (employmentNum) {
      const xLabel = employmentNum.map(item => item.date)
      const value = employmentNum.map(item => item.value)
      const mychart = this.$echarts.init(this.$refs.jobChart)
      const option = {
        grid: {
          left: '10%',
          top: '30%',
          bottom: '20%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          data: xLabel,
          axisLabel: {
            fontSize: 10,
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          name: '相关职位比例',
          nameLocation: 'middle',
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          nameTextStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            data: value,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#e5f8fb'
            }
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
  background-color: #fff;
  padding-bottom: 30px;
  .data_chart {
    padding: 0 15px;
    margin-top: 15px;
    .salary_box {
      .salary_chart {
        position: relative;
        .charts {
          width: 100%;
          height: 200px;
        }
        .info {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          text-align: center;
        }
      }
      .tip {
        text-align: center;
        font-size: 10px;
        color: #ccbdc1;
      }
    }
    .experience {
      margin-top: 15px;
      .experience_chart {
        width: 100%;
        height: 200px;
      }
    }
    .salary_change {
      margin-top: 15px;
      .change_chart {
        width: 100%;
        height: 200px;
        margin-top: 20px;
      }
    }
    .job_find {
      margin-top: 15px;
      .job_chart {
        width: 100%;
        height: 200px;
      }
      .info {
        margin-top: 10px;
        p {
          padding-bottom: 10px;
        }
        font-size: 10px;
        color: #333;
      }
    }
  }
}
</style>
