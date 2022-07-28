<template>
  <!-- 写评论的弹窗 -->
  <div>
    <van-popup
      v-model="show"
      style="width: 80%"
      :close-on-click-overlay="false"
      @click-overlay="close"
      round
    >
      <div class="comments">
        <h3>请根据实际情况为企业打分</h3>
        <div class="pop">
          <div class="popLeft">
            <span>岗位描述</span>
            <span>面试情况</span>
            <span>面试官</span>
          </div>
          <div class="popRight">
            <span class="icon">
              <van-rate
                v-model="value"
                :size="18"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
            </span>
            <span class="icon">
              <van-rate
                v-model="value"
                :size="18"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
            </span>
            <span class="icon">
              <van-rate
                v-model="value"
                :size="18"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
            </span>
          </div>
        </div>
        <div class="bottom">
          <span>面试岗位:</span>
          <van-button type="default" class="btn" @click="selectJob"
            >点击选择面试岗位</van-button
          >
        </div>
        <div class="fieldBox">
          <van-field
            class="field"
            rows="5"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入你的面试感受吧"
            show-word-limit
          />
        </div>
      </div>
      <div class="bottomBtn">
        <van-button class="item" @click="close">取消</van-button>
        <van-button class="item">提交</van-button>
      </div>
    </van-popup>
    <Job :isshow.sync="isshow" :list.sync="list" v-if="showList"></Job>
  </div>
</template>

<script>
import Job from './job.vue'
import { companiesPositionFilters } from '@/api/com.js'
export default {
  data () {
    return {
      isshow: false,
      value: 3,
      list: [],
      showList: false,
      show: false
    }
  },
  components: {
    Job
  },
  props: {
    // show: {
    //   type: Boolean,
    //   requierd: true
    // }
  },
  methods: {
    // 关闭评论框
    close () {
      this.show = false
    },
    // 打开选择岗位弹窗
    async selectJob () {
      this.isshow = true
      const res = await companiesPositionFilters(this.$route.params.id)
      console.log('职业', res)
      this.list = res.data.data.types
      this.showList = true
    }
  }
}
</script>

<style lang="less" scoped>
.bottomBtn {
  display: flex;
  .item {
    flex: 1;
    &:nth-child(2) {
      color: red;
    }
  }
}
.fieldBox {
  margin-top: 20px;
}
.field {
  background-color: #f7f4f5;
}
h3 {
  margin-bottom: 20px;
}
.comments {
  padding: 30px;
}
.pop {
  display: flex;
  justify-content: space-between;
  .popLeft {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
  .popRight {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 10px;
    }
    i {
      font-size: 16px;
    }
  }
}
.bottom {
  .btn {
    font-size: 12px;
    border: 1px solid #c6c6cc;
    border-radius: 5px;
    font-weight: 700;
    margin-left: 30px;
  }
}
</style>
