<template>
  <div class="find">
    <van-nav-bar title="发现" />
    <InterviewSkills></InterviewSkills>
    <MarketData></MarketData>
    <InterviewExperience></InterviewExperience>
    <div class="footer">
      <van-divider
        dashed
        :style="{ fontSize: '12px', color: '#c4c3ca;', borderColor: '#c4c3ca' }"
        >到底啦</van-divider
      >
    </div>
  </div>
</template>

<script>
import InterviewSkills from './components/InterviewSkills'
import MarketData from './components/MarketData'
import InterviewExperience from './components/InterviewExperience'
export default {
  name: '',
  data () {
    return {}
  },
  components: {
    InterviewSkills,
    MarketData,
    InterviewExperience
  }
}
</script>

<style lang="less" scoped>
.find {
  ::v-deep .van-nav-bar__title {
    font-size: 19px;
    font-weight: 700;
  }
  .footer {
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
    background-color: rgba(247, 244, 245);
  }
}
</style>
