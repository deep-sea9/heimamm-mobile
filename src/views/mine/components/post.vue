<template>
  <div class="post">
    <van-nav-bar
      :title="title[position]"
      @click-left="$router.back()"
      :right-text="btnShow ? '保存' : ''"
    >
      <template #left>
        <span class="iconfont" style="font-size:40px;margin-left:-20px  "
          >&#xe637;</span
        >
      </template>
    </van-nav-bar>
    <div class="input">
      <!-- 头像修改 -->
      <van-uploader
        v-model="fileList"
        v-if="position === 'avatar'"
        preview-size="200"
        imageFit="cover"
        :max-count="1"
        :before-read="beforeRead"
        :after-read="afterRead"
      >
      </van-uploader>
      <!-- <van-uploader
        v-if="position === 'avatar'"
        width="100px"
        height="100px"
        :src="require('@/img/8.jpg')"
      ></van-uploader> -->
      <!-- 输入框 -->
      <van-field v-else v-model="post" placeholder="请输入岗位"></van-field>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      position: this.$route.params.editInfo,
      post: '最最最',
      title: {
        position: '修改岗位',
        avatar: '修改头像',
        nickname: '修改昵称',
        intro: '修改简介'
      },
      fileList: [{ url: require('@/img/8.jpg') }],
      btnShow: false
    }
  },
  // created () {
  //   this.ggg()
  // },
  methods: {
    // ggg () {
    //   console.log(this.position)
    //   console.log(111)
    // }
    // 上传前的限制
    beforeRead (file) {
      // 限制上传图片的类型
      const typeArr = ['image/png', 'image/jpeg']
      // includes包含
      const limitType = typeArr.includes(file.type)
      // console.log(file)
      // 没有上传规定的类型，提示错误
      if (!limitType) {
        this.$toast.fail('请上传jpg与png图片')
      }
      // file.size是字节所以要除以1024转换成kb再除变成mb
      const limitSize = file.size / 1024 / 1024 < 1
      console.log(file)
      if (!limitSize) {
        this.$toast.fail('请上传1MB以内图片')
      }
      return limitType && limitSize
    },
    // 上传后的处理
    afterRead (res) {
      this.btnShow = true
      // this.imgBase64 = res.content
      console.log('afterRead', res)
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  text-align: center;
  padding: 20px 10px;
}
::v-deep .van-icon-arrow-left {
  color: #171717;
}
::v-deep .van-field {
  height: 50px;
  line-height: 35px;
  background-color: #f7f4f5;
  border-radius: 10px;
}
</style>
