<template>
  <div class="topic">
    <van-nav-bar right-text="答题卡" left-arrow @click-left="$router.back()">
      <template #title>
        <div class="navbar">
          面试题<span class="count">{{ list.length }}</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="title">
        【{{ list[0].detail.type === 1 ? '单选' : '多选' }}】{{
          list[0].detail.title
        }}
      </div>
      <div class="tag">
        <span
          class="tip"
          v-for="(item, index) in list[0].detail.tag"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="option">
        <div
          class="item"
          v-for="(item, index) in list[0].detail.option"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="collect">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
      <div class="feedback">
        <van-icon name="edit" />
        <span>反馈</span>
      </div>
      <div class="num">
        <span>{{ 31 }}</span
        ><i>/{{ 103 }}题</i>
      </div>
      <van-button type="danger" style="margin-right: 15px">提交</van-button>
    </div>
  </div>
</template>

<script>
import { interviewQuestions } from '@/api/interview'
export default {
  name: '',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getQuestionList()
  },
  methods: {
    // 获取模拟面试题
    async getQuestionList () {
      const res = await interviewQuestions(this.$route.query)
      this.list = res.data.data
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  background-color: #fff;
  height: 100vh;
  .navbar {
    width: 80px;
    position: relative;
    .count {
      position: absolute;
      top: -5px;
      right: 0;
      font-size: 12px;
    }
  }
  .content {
    padding: 15px;
    .tag {
      margin: 15px 0;
      .tip {
        padding: 3px;
        background-color: #f7f4f5;
        border-radius: 5px;
        color: #bbbbbb;
        margin-right: 8px;
      }
    }
    .option {
      margin-top: 10px;
      .item {
        padding: 10px 0;
        padding-left: 15px;
        border: 1px solid #efefef;
        margin-bottom: 15px;
        border-radius: 20px;
        text-align: center;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px 0;
    .collect,
    .feedback {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 20px;
      .van-icon {
        font-size: 20px;
      }
      span {
        margin-top: 5px;
        font-size: 12px;
      }
    }

    .num {
      flex: 1;
      text-align: center;
      span {
        font-size: 18px;
        color: #d42d3e;
      }
      i {
        font-size: 10px;
      }
    }
  }
}
</style>
