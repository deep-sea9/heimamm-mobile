<template>
  <div class="topic" v-if="subject !== ''">
    <van-nav-bar
      right-text="答题卡"
      left-arrow
      @click-left="exit"
      @click-right="show = true"
    >
      <template #title>
        <div class="navbar">
          面试题<span class="count">{{ subject.length }}</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="title">
        【{{ subject.type | formatter(type) }}】{{ subject.title }}
      </div>
      <div class="tag">
        <span class="tip" v-for="(item, index) in subject.tag" :key="index">{{
          item
        }}</span>
      </div>
      <div class="option" v-if="subject.type === 1">
        <div
          :class="[
            {
              active: currentIndex === index,
              mistake: answer.errorIndex === index,
              correct: answer.trueIndex === index
            },
            'item'
          ]"
          v-for="(item, index) in subject.option"
          :key="index"
          @click="selectedQa(index)"
        >
          <van-icon
            :name="answer.trueIndex === index ? 'success' : 'cross'"
            class="icon"
          />
          {{ number[index] + '.  ' + item }}
        </div>
      </div>
      <div class="option" v-else>
        <div
          :class="[
            {
              active: mutilIndex.includes(index),
              correct: answer && answer.trueIndex[index] === index,
              mistake: answer && answer.errorIndex.includes(index)
            },
            'item'
          ]"
          v-for="(item, index) in subject.option"
          :key="index"
          @click="selectedQa(index)"
        >
          <van-icon
            :name="trueIndex[index] === index ? 'success' : 'cross'"
            class="icon"
          />
          {{ number[index] + '.  ' + item }}
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="collect" @click="collect">
        <van-icon
          :name="collected ? 'star' : 'star-o'"
          :style="{ color: collected ? 'yellow' : '' }"
        />
        <span>收藏</span>
      </div>
      <div class="feedback" @click="showFeedback = true">
        <van-icon name="edit" />
        <span>反馈</span>
      </div>
      <div class="num">
        <span>{{ current + 1 }}</span
        ><i>/{{ total }}题</i>
      </div>
      <div>
        <van-button
          type="info"
          style="margin-right: 15px"
          @click="nextSubject()"
          v-if="answer"
          >下一题</van-button
        >
        <van-button
          v-else
          type="danger"
          style="margin-right: 15px"
          @click="submit"
          :disabled="currentIndex === -1 && mutilIndex.length == 0"
          >提交</van-button
        >
      </div>
    </div>

    <!-- 答案解析 -->
    <div class="answer" v-if="answer">
      <h3>答案解析</h3>
      <p class="your">
        你的答案:
        {{ answerData.singleAnswer || answerData.multipleAnswer.join(',') }}
      </p>
      <p class="true">
        正确答案:
        {{
          answer.result.singleAnswer || answer.result.multipleAnswer.join(',')
        }}
      </p>
      <div class="info">
        <span
          >难度: {{ answer.result.difficulty | formatter(difficulty) }}</span
        >
        <span>提交次数: {{ answer.result.submitNum }}</span>
        <span>正确次数: {{ answer.result.correctNum }}</span>
      </div>
      <div class="detail">
        {{ answer.result.answerAnalysis }}
      </div>
    </div>

    <!-- 答题卡 -->
    <van-action-sheet v-model="show" title="答题卡" class="action">
      <div class="header">{{ current + 1 }}/{{ total }}题</div>
      <div class="content">
        <ul>
          <li
            :class="{
              current: current === index,
              done: complete.find(item => item.index === index)
            }"
            v-for="(item, index) in list"
            :key="index"
            @click="goSubject(item, index)"
          >
            {{ index + 1 }}
          </li>
        </ul>
      </div>
    </van-action-sheet>

    <!-- 意见反馈 -->
    <van-popup v-model="showFeedback" round :style="{ width: '80%' }">
      <div class="feedbackModal">
        <h3>意见反馈</h3>
        <van-field
          v-model.trim="comment"
          rows="6"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入你对此题的反馈意见"
          show-word-limit
        />
        <div class="btn">
          <van-button @click="closeFeedback">取消</van-button>
          <van-button :disabled="!comment" @click="submitComment"
            >提交</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  interviewQuestions,
  questionsSubmit,
  questionsById,
  questionsCollect,
  questionsComment
} from '@/api/interview'

export default {
  name: '',
  data () {
    return {
      subject: '',
      selected: false,
      number: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      currentIndex: -1,
      mutilIndex: [],
      total: 0,
      show: false,
      // answer: '',
      // 正确答案索引值
      trueIndex: '',
      // 错误答案索引值
      errorIndex: '',
      // 所有的题目
      list: [],
      // 当前题目索引值
      current: 0,
      id: 0,
      // 已经答题的单选题目解析
      complete: [],
      // 多选题目解析
      multihistory: [],
      answerData: {
        id: '',
        singleAnswer: '',
        multipleAnswer: []
      },
      collected: false,
      showFeedback: false,
      comment: '',
      type: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      difficulty: {
        1: '简单',
        2: '中等',
        3: '困难'
      }
    }
  },
  created () {
    this.getQuestionList()
  },
  methods: {
    // 退出答题
    exit () {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '您确定要退出答题吗?'
        })
        .then(() => {
          this.$router.push('/question')
        })
    },
    // 获取模拟面试题
    async getQuestionList () {
      const res = await interviewQuestions(this.$route.query)
      this.list = res.data.data
      this.total = res.data.data.length
      this.id = res.data.data[0].id
      this.subject = res.data.data[0].detail
    },
    selectedQa (index) {
      if (this.answer) {
        return (this.currentIndex = -1)
      }
      if (this.subject.type === 1) {
        if (this.currentIndex === index) {
          this.currentIndex = -1
          return
        }
        this.currentIndex = index
      } else {
        const i = this.mutilIndex.findIndex(item => item === index)
        if (this.mutilIndex.includes(index)) {
          this.mutilIndex.splice(i, 1)
        } else {
          this.mutilIndex.push(index)
        }
      }
    },
    // 提交试题
    async submit () {
      this.answerData.id = this.id
      if (this.subject.type === 1) {
        this.answerData.singleAnswer = this.number[this.currentIndex]
      } else {
        this.answerData.multipleAnswer = this.mutilIndex.map(item => {
          return this.number.find((v, index) => item === index)
        })
      }

      // 提交答案,获得解析
      const res = await questionsSubmit(this.answerData)

      if (this.subject.type === 1) {
        this.trueIndex = this.number.findIndex(
          item => item === res.data.data.singleAnswer
        )
        if (this.trueIndex !== this.currentIndex) {
          this.errorIndex = this.currentIndex
        }
      } else {
        this.trueIndex = res.data.data.multipleAnswer.map(item => {
          return this.number.findIndex(v => v === item)
        })
        this.errorIndex = this.mutilIndex.filter(item => {
          return !this.trueIndex.includes(item)
        })
      }
      this.complete.push({
        index: this.current,
        result: res.data.data,
        trueIndex: this.trueIndex,
        errorIndex: this.errorIndex
      })

      this.currentIndex = -1
      this.mutilIndex = []
    },
    // 获取新题目
    async newSubject (id) {
      const res = await questionsById(id)
      this.subject = res.data.data
      this.id = id
      this.errorIndex = ''
      this.trueIndex = ''
      this.answerData = {
        id: '',
        singleAnswer: '',
        multipleAnswer: []
      }
      this.collected = false
    },
    // 答题卡跳转题目
    goSubject (item, index) {
      console.log(item, index)
      this.newSubject(item.id)
      this.current = index
      this.show = false
    },
    // 下一题
    nextSubject () {
      this.current = this.current + 1
      this.newSubject(this.list[this.current].id)
      // this.current++
    },
    // 收藏试题
    async collect () {
      await questionsCollect({ id: this.id })
      this.collected = true
      this.$toast.success('收藏成功')
    },
    // 提交反馈
    async submitComment () {
      await questionsComment({
        content: this.comment,
        question: this.id
      })
      this.$toast.success('感谢你的反馈,您的意见会使我们更好进步')
      this.showFeedback = false
      this.comment = ''
    },
    closeFeedback () {
      this.showFeedback = false
      this.comment = ''
    }
  },
  computed: {
    // 本次的解析
    answer () {
      const res = this.complete.find(item => item.index === this.current)

      if (res) {
        return res
      } else {
        return false
      }
    }
  },
  filters: {
    formatter (value, type) {
      const key = Object.keys(type).find(key => key === value + '')
      return type[key]
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  background-color: #fff;
  height: 100vh;
  padding: 0 15px;

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
    padding: 15px 0;
    .tag {
      margin: 15px 0;
      display: flex;
      flex-wrap: wrap;
      .tip {
        padding: 3px;
        background-color: #f7f4f5;
        border-radius: 5px;
        color: #bbbbbb;
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
    .option {
      margin-top: 10px;
      .item {
        position: relative;
        padding: 10px;
        padding-left: 15px;
        border: 1px solid #efefef;
        margin-bottom: 15px;
        border-radius: 20px;
        text-align: center;
        &.active {
          background: #d42d3e;
          color: #fff;
        }
        .icon {
          display: none;
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        &.mistake {
          background-color: #ffefea;
          color: #ff5000;
          .icon {
            display: block;
          }
        }
        &.correct {
          background-color: #ddfad9;
          color: #8f8f00;
          .icon {
            display: block;
          }
        }
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
    background-color: #fff;
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
  .answer {
    padding-bottom: 80px;
    .your {
      margin-top: 15px;
      color: #8f8f00;
    }
    .true {
      padding: 15px 0;
      color: #1dcbc4;
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f7f4f5;
      padding: 12px 10px;
      span {
        font-size: 12px;
        text-align: left;
        &:nth-child(2) {
          flex: 1;
          text-align: center;
        }
      }
    }
    .detail {
      margin-top: 15px;
    }
  }

  .action {
    .header {
      padding: 15px;
      background-color: #f7f4f5;
    }
    .content {
      padding: 15px;

      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 35px;
          height: 35px;
          border: 1px solid #ccc;
          border-radius: 50%;
          text-align: center;
          line-height: 35px;
          margin: 0 8px 10px 0;
          font-size: 12px;
          &.current {
            border-color: #8f8f00;
          }
          &.done {
            background-color: #ffefea;
            border: none;
          }
        }
      }
    }
  }
  .feedbackModal {
    h3 {
      text-align: center;
      padding: 15px 0 5px;
    }
    .btn {
      display: flex;
      margin-top: 5px;
      .van-button {
        flex: 1;
        text-align: center;
      }
    }

    ::v-deep .van-cell__value {
      background-color: #f7f4f5;
      border-radius: 5px;
      padding: 5px;
    }
  }
}
::v-deep .van-grid-item__content {
  width: 35px;
  height: 35px;
  border: 1px solid #bebec5;
  border-radius: 50%;
}
</style>
