<template>
  <div class="login">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <i class="iconfont ">&#xe637;</i>
      </template>
    </van-nav-bar>
    <h4>您好，请登录</h4>
    <van-form ref="form">
      <div class="field">
        <van-field
          placeholder="请输入手机号"
          v-model.trim="userInfo.mobile"
          :rules="rules.mobile"
        >
          <template #left-icon>
            <i class="iconfont ">&#xe60b; </i>
          </template>
        </van-field>
        <van-field
          placeholder="请输入验证码"
          v-model.trim="userInfo.code"
          :rules="rules.code"
        >
          <template #left-icon>
            <i class="iconfont ">&#xe60c; </i>
          </template>
        </van-field>

        <div class="count" v-if="show == 0" @click="getcode">获取验证码</div>
        <div class="count" v-if="show == 1">{{ count }}s 后重试</div>
        <div class="count" v-if="show == 2" @click="getcode">重新获取</div>
        <p>
          登录即同意
          <a href="javascript:;">《用户使用协议》</a>
          和
          <a href="javascript:;">《隐私协议》</a>
        </p>
      </div>
    </van-form>

    <!-- loading弹窗 -->
    <div class="loading" v-if="loading">
      <van-loading size="40px" vertical text-color="#fff"
        >加载中...</van-loading
      >
    </div>
    <div style="margin: 16px">
      <van-button round block type="danger" @click="submit">确定</van-button>
    </div>
  </div>
</template>

<script>
import { code, login } from '@/api/login.js'
export default {
  data () {
    return {
      show: 0,
      count: '',
      timer: null,
      loading: false,
      userInfo: {
        mobile: '18888881111',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'onChange' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号不合法',
            trigger: 'onChange'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{4}$/,
            message: '验证码不合法',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    // 点击箭头跳转
    onClickLeft () {
      this.$router.push('/find')
    },
    // 获取验证码
    async validation () {
      this.loading = true
      const res = await code(this.userInfo)
      // console.log(res)
      this.userInfo.code = res.data.data
      this.loading = false
    },
    // 验证码倒计时
    async getcode () {
      const times = 5 // 倒计时时间
      if (!this.timer) {
        this.count = times
        this.show = 1
        this.validation()

        this.timer = setInterval(() => {
          if (this.count > 1 && this.count <= times) {
            this.count--
          } else {
            this.show = 2
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 点击确定
    submit () {
      this.$refs.form
        .validate()
        .then(async () => {
          console.log('来了哦小老弟')
          this.loading = true
          try {
            const res = await login(this.userInfo)
            console.log(res)
            this.$store.commit('setToken', res.data.data.jwt)
            this.$toast.success('客官欢迎你')

            // 跳转
            this.$router.push(this.$route.query.back || '/mine')
          } catch (error) {
            console.log(error)
            // this.$toast.fail(error.response.data.message)
          } finally {
            this.loading = false
          }
        })
        .catch(() => {
          console.log('验证失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  position: relative;
  background-color: #fff;
  i.iconfont {
    margin: -16px;
    font-size: 40px;
  }
  h4 {
    font-size: 20px;
    padding: 50px 20px;
  }
  .field {
    position: relative;
    padding: 20px;
    i {
      font-size: 14px;
      margin-right: 15px;
    }
    .count {
      position: absolute;
      right: 35px;
      bottom: 90px;
      color: #00b8d4;
    }
  }
  p {
    font-size: 12px;
    margin: 20px 0 20px 20px;
    a {
      font-size: 12px;
      color: #00b8d4;
    }
  }
  .loading {
    box-sizing: border-box;
    position: absolute;
    left: 130px;
    bottom: 20px;
    z-index: 1;
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    padding: 25px;
  }
}
</style>
