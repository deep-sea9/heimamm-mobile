<template>
  <div class="InterviewInfo">
    <van-nav-bar @click-left="$router.push('/find')">
      <template #left>
        <i class="iconfont" style="font-size:40px;">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="info">
      <div class="title">{{ list.title }}</div>
      <div class="other">
        <span class="time">{{ list.updated_at | formatTime }}</span>
        <span class="read"
          ><i class="iconfont">&#xe644;</i>{{ list.read }}</span
        >
        <span class="star"
          ><i class="iconfont">&#xe638;</i>{{ list.star }}</span
        >
      </div>
      <div class="content" v-html="list.content"></div>
    </div>
  </div>
</template>
<script>
import { articlesTechnicId } from '@/api/find'
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
    async getData () {
      const res = await articlesTechnicId(this.$route.params.id)
      console.log(res)
      this.list = res.data.data
    }
  }
}
</script>
<style lang="less" scoped>
.InterviewInfo {
  background-color: #fff;
  height: 100vh;
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  .info {
    .title {
      padding: 0 15px;
      padding-top: 10px;
    }
    .other {
      padding: 0 15px;
      margin: 20px 0;
      font-size: 12px;
      color: rgba(198, 198, 205);
      display: flex;
      align-items: center;
      .time {
        flex: 1;
      }
      .read {
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .star {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .content {
      ::v-deep ul {
        padding: 0 15px;
        ::v-deep li {
          padding: 15px 0;
        }
      }
    }
  }
}
</style>
