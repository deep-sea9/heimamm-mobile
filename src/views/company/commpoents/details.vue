<template>
  <!-- 企业详情 -->
  <div class="details">
    <div class="bigbox">
      <div class="top">
        <!-- 导航栏 -->
        <div class="navBar">
          <van-nav-bar
            left-arrow
            class="nbr"
            @click-left="$router.push('/company')"
          >
            <template #right>
              <i class="iconfont iconxingxing2 iconXing"></i>
              <i class="iconfont iconbtn_share iconShare"></i>
            </template>
          </van-nav-bar>
        </div>
        <!-- 公司基本详情 -->
        <div class="topInfo">
          <div class="top2">
            <div class="topLeft">
              <h3>{{ list.name }}</h3>
              <div>
                <span>{{ list.type }}</span>
                <span>{{ list.step }}</span>
                <span>{{ list.scale }}</span>
              </div>
            </div>
            <div class="topRight">
              <img :src="'http://106.55.138.21:1337' + list.logo" alt="" />
            </div>
          </div>
          <div class="jobTime">
            <span
              ><i class="iconfont iconicon_gongsi_time icon"></i
              >{{ list.workTime }}</span
            >
            <span
              ><i class="iconfont iconicon_gongsi_sx icon"></i
              >{{ list.restDay }}</span
            >
            <span
              ><i class="iconfont iconicon_gongsi_jiaban icon"></i
              >{{ list.overtime }}</span
            >
          </div>
          <div class="weal">
            <div v-for="item in list.weals" :key="item.id">
              <span
                ><i class="iconfont iconicon_gongsi_buchongyiliao"></i
                >{{ item.text }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="companyInfo">
      <div class="address">
        <div class="addressTop">
          <van-nav-bar left-text="公司地址">
            <template #right>
              <span>全部地址</span>
              <i class="iconfont iconicon_more rightIcon"></i>
            </template>
          </van-nav-bar>
        </div>
        <div class="addressbottom">
          <div class="addressLeft">
            <div>
              <span>{{ list.address }}</span>
            </div>
            <p>距离当前50m,步行需要57秒</p>
          </div>
          <div class="addressRight">
            <span><i class="iconfont iconicon_gongsi_daohang"></i>导航</span>
          </div>
        </div>
      </div>
      <div class="companyProfile">
        <h3>公司简介</h3>
        <p>{{ list.desc }}</p>
        <div>
          <span>展开更多</span>
          <i class="iconfont iconicon_zhankai"></i>
        </div>
      </div>
      <div class="companyPic">
        <h3>公司照片</h3>
        <div class="pic">
          <div v-for="(item, index) in list.sliders" :key="index">
            <div>
              <img :src="'http://106.55.138.21:1337' + item" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="icbcInfo">
        <h3>工商信息</h3>
        <div class="icbcBox">
          <div class="icbcLeft">
            <span>公司全称</span>
            <span>成立时间</span>
            <span>注册资本</span>
            <span>法人代表</span>
            <span>信息来源</span>
          </div>
          <div class="icbcRight">
            <span>{{ list.fullname }}</span>
            <span>{{ list.establishedTime }}</span>
            <span>{{ list.capital }}</span>
            <span>{{ list.legalPerson }}</span>
            <span>{{ list.messageSource }}</span>
          </div>
        </div>
      </div>
      <div class="evaluate">
        <div class="evaluateTop">
          <h3>面试评价</h3>
          <span @click="write">写评论</span>
        </div>
        <div class="evaluateBox">
          <div class="evaluateLeft">
            <div>
              <span>4.8</span>
              <span>分</span>
            </div>
            <span class="icon">
              <van-rate v-model="state" readonly :size="18" />
            </span>
          </div>
          <div class="evaluateRight">
            <div class="smallLeft">
              <span>岗位描述</span>
              <span>面试情况</span>
              <span>面试官</span>
            </div>
            <div class="smallRight">
              <span>
                <van-rate v-model="state" readonly :size="18" />
              </span>
              <span>
                <van-rate v-model="state" readonly :size="18" />
              </span>
              <span>
                <van-rate v-model="state" readonly :size="18" />
              </span>
            </div>
          </div>
        </div>
        <div class="comment" v-for="(item, index) in list2" :key="index">
          <div class="commentLeft">
            <img :src="'http://106.55.138.21:1337' + item.user.avatar" alt="" />
          </div>
          <div class="commentRight">
            <div class="userTop">
              <div class="userLeft">
                <span class="userName">{{ item.user.nickname }}</span>
                <span>面试岗位:{{ item.position }}</span>
              </div>
              <div class="userRight">
                <span class="userIcon">
                  <van-rate v-model="item.positionScore" readonly :size="18" />
                </span>
              </div>
            </div>
            <div class="userMiddle">
              <div v-for="(item2, index) in item.tags" :key="index">
                <span>{{ item2 }}</span>
              </div>
            </div>
            <div class="userBouutom">
              <p>{{ item.content }}</p>
              <p>{{ item.created_at }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Comments :show.sync="show"></Comments>
  </div>
</template>

<script>
import { companies, companiesComments } from '@/api/com.js'
import Comments from './writeComments.vue'
export default {
  components: {
    Comments
  },
  data () {
    return {
      list: '',
      list2: [],
      show: false,
      state: 4
    }
  },

  created () {
    this.getData()
  },
  methods: {
    receive (bol) {
      this.show = bol
    },
    async getData () {
      // 获取公司详情
      console.log(this.$route.params.id)
      const res = await companies(this.$route.params.id)
      this.list = res.data.data
      const res2 = await companiesComments({
        id: +this.$route.params.id,
        start: 0
      })
      console.log(res2)
      this.list2 = res2.data.data.list
    },
    // 写评论弹窗
    write () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep.van-nav-bar .van-icon {
  color: #fff;
}
.nbr {
  background-color: rgba(0, 0, 0, 0);
}
.bigbox {
  background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.soogif.com%2FQwCAOkorGzsl7pL4sG47iIvaPojkYqZC.gif&refer=http%3A%2F%2Fimg.soogif.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661423765&t=a60113a2fbe9e286dc39ca4a0172b9ab')
    no-repeat;
  filter: blur(0px); // 背景虚化
}
.details {
  background-color: #fff;
  height: 100vh;
  .navBar {
    .iconXing {
      color: #fff;
      font-size: 20px;
    }
    .iconShare {
      color: #fff;
      margin-left: 10px;
      font-size: 22px;
    }
  }
  .topInfo {
    padding: 10px;
    .top2 {
      display: flex;
      justify-content: space-between;
      .topRight {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .topLeft {
        h3 {
          color: #fff;
          margin-bottom: 20px;
        }
        span {
          border: 1px solid #939aaa;
          color: #d4d4da;
          border-radius: 4px;
          padding: 2px;
          font-size: 12px;
          &:nth-child(2) {
            margin: 0 10px;
          }
        }
      }
    }
    .jobTime {
      margin-top: 20px;
      span {
        color: #eaeaed;
        .icon {
          color: #fff;
        }
        &:nth-child(2) {
          margin: 0 10px;
        }
      }
    }
    .weal {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      div {
        flex: 1;
        display: flex;
        align-items: center;
        border: 1px solid #939aaa;
        padding: 5px;
        border-radius: 8px;
        span {
          display: flex;
          align-items: center;
          color: #eaeaed;
          i {
            color: #fff;
            font-size: 18px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

.companyInfo {
  .address {
    .addressTop {
      ::v-deep .van-nav-bar__text {
        color: #131535;
        font-weight: 700;
      }
      span {
        color: #828395;
        font-size: 13px;
      }
      .rightIcon {
        color: #5b5c76;
      }
    }
    .addressbottom {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .addressLeft {
        span {
          &:nth-child(2) {
            margin: 0 20px;
          }
        }
        p {
          font-size: 12px;
          color: #bdbdc5;
          margin-top: 10px;
        }
      }
      .addressRight {
        span {
          border: 1px solid #939aaa;
          padding: 8px;
          border-radius: 15px;
          color: #8f90a1;
        }
      }
    }
  }
  .companyProfile {
    padding: 20px;
    h3 {
      margin: 20px 0;
    }
    div {
      margin: 20px 0;
      text-align: center;
      span {
        font-size: 12px;
        color: #686a81;
        margin-right: 10px;
      }
      i {
        color: #b6b6bf;
        font-size: 12px;
      }
    }
  }
  .companyPic {
    padding: 20px;
    h3 {
      margin-bottom: 20px;
    }
    .pic {
      display: flex;
      box-sizing: border-box;
      overflow-x: auto;

      div {
        // flex: 1;
        width: 100px;
        height: 100px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .icbcInfo {
    padding: 20px;
    h3 {
      margin-bottom: 20px;
    }
    .icbcBox {
      display: flex;
      .icbcLeft {
        width: 70px;
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        color: #b6b6bf;
        span {
          font-size: 12px;
          margin-bottom: 20px;
        }
      }
      .icbcRight {
        flex: 1;
        display: flex;
        flex-direction: column;
        span {
          font-size: 12px;
          margin-bottom: 20px;
        }
      }
    }
  }
  .evaluate {
    padding: 0 20px;
    .evaluateTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }
    .evaluateBox {
      margin-top: 20px;
      display: flex;
      padding: 20px;
      background-color: #f7f7f7;
      .evaluateLeft {
        border-right: 2px solid #eae8e8;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 10px;
        span {
          &:nth-child(1) {
            color: #00b6d3;
            font-size: 25px;
          }
        }
        .icon {
          margin-top: 15px;
          i {
            font-size: 14px;
          }
        }
      }
      .evaluateRight {
        padding: 10px;
        display: flex;
        align-items: center;
        .smallLeft,
        .smallRight {
          display: flex;
          flex-direction: column;
          span {
            margin-bottom: 10px;
          }
        }
        .smallRight {
          flex: 1;
        }
        .smallLeft {
          margin-right: 10px;
          width: 60px;
        }
      }
    }
  }
  .comment {
    margin-top: 30px;
    display: flex;
    .commentLeft {
      width: 50px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .commentRight {
      .userTop {
        display: flex;
        .userLeft {
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
            &:nth-child(2) {
              color: #c7c7ce;
              margin: 10px 0;
            }
          }
        }
        .userRight {
          flex: 1;
          text-align: right;
        }
      }
      .userMiddle {
        margin-bottom: 20px;
        display: flex;

        span {
          padding: 5px;
          background-color: #f7f4f5;
          border-radius: 5px;
          &:nth-child(1) {
            margin-right: 7px;
          }
        }
      }
      .userBouutom {
        p {
          &:nth-child(2) {
            margin-top: 10px;
            color: #c9c9d0;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
