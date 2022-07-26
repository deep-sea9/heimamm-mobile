<template>
  <div class="topic">
    <van-nav-bar
      title="标题"
      right-text="答题卡"
      left-arrow
      @click-left="$router.back()"
    />
    <div>{{ $route.query }}</div>
  </div>
</template>

<script>
import { interviewQuestions } from '@/api/interview'
export default {
  name: '',
  data () {
    return {}
  },
  created () {
    this.getQuestionList()
  },
  methods: {
    // 获取模拟面试题
    async getQuestionList () {
      const res = await interviewQuestions(this.$route.query)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped></style>
