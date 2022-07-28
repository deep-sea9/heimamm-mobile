<template>
  <div class="post">
    <van-nav-bar :title="title[mode]" @click-left="$router.back()">
      <!-- @click-right="onClickRight" -->
      <template #left>
        <span class="iconfont" style="font-size:40px;margin-left:-20px  "
          >&#xe637;</span
        >
      </template>
      <template #right>
        <div v-if="btnShow" @click="submit">保存</div>
      </template>
    </van-nav-bar>
    <div class="input">
      <!-- 头像修改 -->
      <van-uploader
        v-model="fileList"
        v-if="mode === 'avatar'"
        preview-size="200"
        imageFit="cover"
        :max-count="1"
        :before-read="beforeRead"
        :after-read="afterRead"
      >
      </van-uploader>
      <van-field
        v-else
        v-model="post"
        :placeholder="'请输入' + title[mode]"
        @input="submitInput"
      ></van-field>
    </div>
    <!-- 裁剪图片 -->
    <div class="crop" v-if="cropShow">
      <VueCropper
        :img="imgBase64"
        ref="cropper"
        autoCrop
        autoCropWidth="200px"
        autoCropHeight="200px"
        fixed
      ></VueCropper>
      <div class="crop-btn">
        <van-button class="crop-item" @click="cropShow = false"
          >取消</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Upload, auEdit } from '@/api/mine'
import { Toast } from 'vant'
// 导入简介
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      // 获取动态路由最后面地址
      mode: this.$route.params.editInfo,
      post: '',
      title: {
        position: '修改岗位',
        avatar: '修改头像',
        nickname: '修改昵称',
        intro: '修改简介'
      },
      fileList: [
        {
          url: 'http://192.168.11.131:1337' + this.$store.state.userInfo.avatar
          // url: 'http://106.55.138.21:1337' + this.$store.state.userInfo.avatar
        }
      ],
      // 头像修改显示按钮(初始不显示)
      btnShow: false,
      fromData: {
        nickname: '',
        intro: '',
        gender: '',
        avatar: '',
        position: '',
        area: ''
      },
      obj: '',
      cropShow: false,
      // 裁剪的图片
      imgBase64: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    // 进入页面渲染对应的值
    this.post = this.userInfo[this.mode]
  },

  methods: {
    // 修改图片
    // async onClickRight(){
    //   await auEdit({this.

    //   })
    // },
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
    async afterRead (file) {
      this.imgBase64 = file.content
      const param = new FormData()
      // 把file追加进为FormData类型的数据
      param.append('files', file.file)
      // console.log('afterRead', res.file)
      const res = await Upload(param)
      // console.log('res', res)
      this.btnShow = true
      // 上传图片就显示
      this.cropShow = true
      this.obj = res.data.data[0]
      // console.log('存储修改图片的数据', this.obj)
    },

    // 点击修改数据
    async submit () {
      Toast.loading({
        message: '正在保存',
        forbidClick: true,
        duration: 0
      })
      this.cropShow = false
      await auEdit({
        [this.mode]: this.mode === 'avatar' ? this.obj.id : this.post
      })
      // 手动清除 Toast
      Toast.clear()
      this.$store.commit('setUserInfo', {
        ...this.userInfo,
        [this.mode]: this.mode === 'avatar' ? this.obj.url : this.post
      })
      this.$router.go(-1)
    },
    // field 修改时显示保存
    async submitInput (post) {
      if (!(post === this.userInfo[this.mode])) {
        this.btnShow = true
      } else {
        this.btnShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post {
  background-color: #fff;
  height: 100vh;
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
  .crop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    .crop-btn {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      justify-content: space-between;
      .crop-item {
        flex: 1;
      }
    }
  }
}
</style>
