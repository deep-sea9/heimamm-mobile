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
      <van-cell title="头像" is-link>
        <template #extra>
          <!-- <van-image src="@/img/8.jpg" width="20" height="20"></van-image> -->
          <img class="photo" :src="require('@/img/8.jpg')" alt="" />
        </template>
      </van-cell>
      <van-cell-group>
        <van-cell title="昵称" value="我嫩嫩" is-link></van-cell>
        <!-- 修改性别 -->
        <van-cell
          title="性别"
          value="女"
          is-link
          @click="showGender"
        ></van-cell>
        <van-popup
          v-model="gender"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            @cancel="onGender"
            show-toolbar
            :columns="columns"
          ></van-picker>
        </van-popup>
        <!-- 修改地区 -->
        <van-cell
          title="地区"
          value="桂林市"
          is-link
          @click="showRegion"
        ></van-cell>
        <van-popup
          v-model="region"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            @cancel="onRegion"
            show-toolbar
            :columns="columns2"
          ></van-picker>
        </van-popup>

        <van-cell title="个人简称" value="我你嘚嘚嘚得得" is-link></van-cell>
      </van-cell-group>
      <van-button plain type="danger" block>退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gender: false,
      region: false,
      columns: [1, 2, 3],
      columns2: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ]
    }
  },
  methods: {
    showGender () {
      this.gender = true
    },
    showRegion () {
      this.region = true
    },
    // 取消，关闭弹框
    onGender () {
      this.gender = false
    },
    onRegion () {
      this.region = false
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  background-color: #f7f4f5;
  height: 667px;
  ::v-deep .van-icon-arrow-left {
    color: #171717;
  }
  .content {
    padding: 20px 15px;
    // 头像
    .photo {
      position: fixed;
      margin-left: 260px;
      margin-top: -5px;
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
