<template>
  <div class="InterviewSkills">
    <!-- 面试技巧 -->
    <van-cell-group>
      <van-cell
        title="面试技巧"
        value="查看更多"
        is-link
        style="padding:20px 15px"
      />
    </van-cell-group>
    <div
      class="technic"
      v-for="(item, index) in list.slice(0, 3)"
      :key="index"
      @click="$router.push('/InterviewInfo/' + item.id)"
    >
      <div class="left">
        <div class="title">{{ item.title }}</div>
        <div class="other">
          <span class="time">{{ item.updated_at | formatTime }}</span>
          <span class="watch"
            ><i class="iconfont">&#xe644;</i>{{ item.read }}</span
          >
          <span class="star"
            ><i class="iconfont">&#xe638;</i>{{ item.star }}</span
          >
        </div>
      </div>
      <div class="right">
        <img :src="'http://106.55.138.21:1337' + item.cover" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { articlesTechnic } from '@/api/find'
export default {
  name: '',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      const res = await articlesTechnic()
      // console.log(res)
      this.list = res.data.data.list
      console.log(this.list)
    }
    // 获取文章详情
  }
}
</script>
<style lang="less" scoped>
.InterviewSkills {
  ::v-deep .van-cell__title {
    font-size: 17px;
    font-weight: 700;
  }
  .technic {
    background-color: #fff;
    padding: 0 16px 42px 16px;
    display: flex;
    .left {
      display: flex;
      height: 78px;
      width: 226px;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 17px;
        font-weight: 700;
      }
      .other {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #ccccd3;
        .time {
          flex: 1;
        }
        .watch {
          margin-right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .right {
      img {
        width: 117px;
        height: 78px;
        display: block;
      }
    }
  }
}
</style>
