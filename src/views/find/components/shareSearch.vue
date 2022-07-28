<template>
  <div class="shareSearch">
    <van-nav-bar title="面经分享搜索" @click-left="$router.push('/shareList')">
      <template #left>
        <i class="iconfont" style="font-size:40px;">&#xe637;</i>
      </template>
    </van-nav-bar>
    <!-- <form action="/"> -->
    <van-search
      v-model.trim="inputVal"
      shape="round"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <!-- </form> -->
    <div class="search">
      <div class="hot">
        <van-cell title="大家都在搜"></van-cell>
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="history">
          <van-cell class="" title="历史搜索" value="清空" @click="clear" />
          <div class="items">
            <div class="item" v-for="(item, index) in histroyList" :key="index">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="警告"
      show-cancel-button
      @confirm="update"
      @cancel="cancel"
      >是否清除搜索历史</van-dialog
    >
  </div>
</template>
<script>
import { articlesShareTopSearch } from '@/api/find'
import { setCookie, getCookie, removeCookie } from '@/utils/cookie'
export default {
  name: '',
  data () {
    return {
      show: false,
      inputVal: '',
      list: [],
      histroyList: JSON.parse(getCookie('histroyList') || '[]')
    }
  },
  created () {
    this.getData()
    console.log(this.histroyList)
  },
  methods: {
    async getData () {
      const res = await articlesShareTopSearch()
      this.list = res.data.data
    },
    inputSearch () {
      clearTimeout(this.interval)
      this.interval = setTimeout(() => {
        // this.inputEvent()
      }, 500)
    },
    onSearch () {
      // 非空判断
      if (this.inputVal === '') {
        this.$toast.fail('哥,多多少少输入一点吧Ծ‸Ծ')
        return
      }
      // 非空判断且不包含时才添加到历史记录
      if (!this.histroyList.includes(this.inputVal)) {
        this.histroyList.push(this.inputVal)
        setCookie('histroyList', JSON.stringify(this.histroyList))
      }
      // 存入历史记录
      this.saveHistroy(this.inputVal)
      // 清空输入框
      this.inputVal = ''
    },
    saveHistroy (val) {
      // 联想词存储
      if (!this.histroyList.includes(val)) {
        // 存储原始联想词
        this.histroyList.push(val)
        setCookie('histroyList', JSON.stringify(this.histroyList))
      }
    },
    // 清空按钮
    clear () {
      this.show = true
      // 移除cookie
      removeCookie('histroyList')
    },
    // 取消按钮
    cancel () {
      this.show = false
    },
    // 确定按钮
    update () {
      this.histroyList = []
      setCookie('histroyList', JSON.stringify(this.histroyList))
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.shareSearch {
  height: 100vh;
  background-color: #fff;
  ::v-deep .van-nav-bar__left {
    padding: 0;
  }
  ::v-deep .van-nav-bar__title {
    font-size: 19px;
    font-weight: 700;
  }
  .search {
    .hot {
      ::v-deep .van-cell__title {
        font-size: 18px;
        font-weight: 700;
      }
      .items {
        background-color: #fff;
        display: flex;
        font-size: 12px;
        padding: 0 15px;
        flex-wrap: wrap;
        color: #818195;
        .item {
          background-color: #f7f4f5;
          padding: 6px 8px;
          margin: 10px 10px 0 0;
          border-radius: 8px;
        }
      }
      .history {
        margin-top: 20px;
        ::v-deep .van-cell__title {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
  .van-dialog {
    text-align: center;
    ::v-deep .van-dialog__content {
      padding-top: 8px;
      padding-bottom: 26px;
      color: #646566;
      font-size: 14px;
    }
  }
}
</style>
