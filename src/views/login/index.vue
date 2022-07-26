<template>
  <div>
    <van-nav-bar>
      <template #left>
        <span class="iconfont" style="font-size:35px;margin-left:-20px">
          &#xe637;</span
        >
      </template>
    </van-nav-bar>

    <div class="title">
      <h3>您好,&nbsp;&nbsp;&nbsp;请登录</h3>
    </div>
    <van-form @submit="onSubmit">
      <!-- 手机号 -->
      <van-field
        v-model="username"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #left-icon>
          <span class="iconfont ">&#xe60b;</span>
        </template>
      </van-field>
      <hr />
      <!-- 验证码 -->
      <van-field
        center
        clearable
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #left-icon>
          <span class="iconfont"> &#xe60c;</span>
        </template>
        <template #button>
          <van-button
            v-if="!codeShow"
            class="col"
            size="small"
            style="color:#42c4d8"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="footer">
        <span style="font-size:10px">登录即同意</span
        ><span style="color:#42c4d8;font-size:10px">《用户使用协议》</span
        ><span style="font-size:10px">和</span
        ><span style="color:#42c4d8;font-size:10px">《隐私协议》</span>
      </div>

      <div style="margin: 16px;">
        <van-button round type="danger" size="large">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return (
      {
        username: '',
        password: '',
        codeShow: true
      },
      {}
    )
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.footer {
  margin-top: 30px;
  margin-left: 20px;
}
</style>
