<template>
  <div class="edit">
    <van-nav-bar title="我的资料" @click-left="$router.push('/mine')">
      <template #left>
        <span class="iconfont" style="font-size:40px;margin-left:-20px  "
          >&#xe637;</span
        >
      </template>
    </van-nav-bar>
    <div class="content">
      <van-cell title="头像" is-link @click="$router.push('/mine/post/avatar')">
        <template #extra>
          <!-- <van-image src="@/img/8.jpg" width="20" height="20"></van-image> -->
          <img class="photo" :src="http + userInfo.avatar" alt="" />
        </template>
      </van-cell>
      <van-cell-group>
        <van-cell
          title="昵称"
          :value="userInfo.nickname"
          is-link
          @click="$router.push('/mine/post/nickname')"
        ></van-cell>
        <!-- 修改性别 -->
        <van-cell
          title="性别"
          :value="userInfo.gender | getSex"
          is-link
          @click="showGender"
        ></van-cell>
        <van-popup
          v-model="gender"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            @confirm="subGender"
            @cancel="onClick"
            show-toolbar
            :columns="columns"
          ></van-picker>
        </van-popup>
        <!-- 修改地区 -->
        <van-cell
          title="地区"
          :value="area"
          is-link
          @click="showRegion"
        ></van-cell>
        <van-popup v-model="region" position="bottom">
          <van-area
            :area-list="areaList"
            :value="userInfo.area"
            :columns-num="2"
            @cancel="onClick"
            @confirm="subRegion"
          />
        </van-popup>

        <van-cell
          title="个人简称"
          :value="userInfo.intro"
          is-link
          @click="$router.push('/mine/post/intro')"
        ></van-cell>
      </van-cell-group>
      <van-button plain type="danger" block @click="exit">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { areaList } from '@vant/area-data'
import { Dialog, Toast } from 'vant'
import { auEdit } from '@/api/mine'
export default {
  data () {
    return {
      // http: 'http://106.55.138.21:1337',
      http: 'http://192.168.11.131:1337',
      // vant提供的城市编码
      areaList,
      gender: false,
      region: false,
      columns: ['未知', '男', '女'],
      fromData: {
        nickname: '',
        intro: '',
        gender: '',
        avatar: '',
        position: '',
        area: ''
      }
    }
  },
  // 过滤
  filters: {
    getSex (value) {
      if (value === 1) {
        return '男'
      } else if (value === 2) {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    area () {
      // 通过values渲染
      // const a = Object.values(this.areaList.city_list).findIndex(item => {
      //   return item === this.userInfo.area
      // })
      // return Object.keys(this.areaList.city_list)[a]
      // 通过keys渲染
      const a = Object.keys(this.areaList.city_list).find(item => {
        return item === this.userInfo.area
      })
      return this.areaList.city_list[a]
    }
  },
  created () {
    console.log(this.area)
    // console.log(this.areaList.city_list)
    // console.log('11', this.userInfo.area)
  },
  methods: {
    showGender () {
      this.gender = true
    },
    showRegion () {
      this.region = true
    },
    // 取消，关闭弹框
    onClick () {
      this.gender = false
      this.region = false
    },
    // 退出登录
    exit () {
      Dialog.confirm({
        title: '提示',
        message: '确定退出登录吗？'
      })
        .then(() => {
          this.$store.commit('leyout')
          this.$toast.success('退出登录成功')
        })
        .catch(() => {})
    },
    // 点击修改性别
    async subGender (value) {
      this.onClick()
      Toast.loading({
        message: '正在保存',
        forbidClick: true,
        duration: 0
      })
      // 拿到选中的下标index
      const index = this.columns.findIndex(item => item === value)
      // console.log('选取的下标', index)
      await auEdit({ gender: index })
      // console.log('value', value)
      // console.log(res)

      // 手动清除 Toast
      Toast.clear()
      this.$store.commit('setUserInfo', {
        ...this.userInfo,
        gender: index
      })
    },
    // 修改地区
    async subRegion (value) {
      this.onClick()
      Toast.loading({
        message: '正在保存',
        forbidClick: true,
        duration: 0
      })
      // console.log(this.areaList.city_list)
      // console.log(value)
      await auEdit({ area: value[1].code })
      // 手动清除 Toast
      Toast.clear()
      this.$store.commit('setUserInfo', {
        ...this.userInfo,
        area: value[1].code
      })
      // await auEdit({area:})
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  background-color: #f7f4f5;
  ::v-deep .van-icon-arrow-left {
    color: #171717;
  }
  .content {
    padding: 20px 15px;
    position: relative;
    // 头像
    .photo {
      position: absolute;
      right: 35px;
      top: 5px;
      width: 35px;
      height: 35px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  ::v-deep .van-cell,
  .van-cell-group {
    border-radius: 10px;
  }
  ::v-deep .van-cell-group {
    margin-top: 10px;
  }
  ::v-deep .van-button {
    border-radius: 10px;
    border: none;
    margin-top: 20px;
  }
}
</style>
