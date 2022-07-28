<template>
  <div class="content-wrap">
    <div :class="['content', expande ? 'expande' : 'close']" ref="content">
      思路：
      1、判断当前内容是否超过三行。此处可以给每行设置一个行高line-height,渲染完后超过三倍的行高即认为是内容超过了三行。
      2、展示/收起状态的切换可以通过data中的参数来绑定。
      3、在底部使用position:absolute来绝对定位展开该在的位置。
      4、根据业务需求来设定好展开和收起按钮需要呆的地方。
    </div>
    <div class="expande-button-wrap" v-if="needShowExpande">
      <div class="expande-button" @click="expandeClick" v-if="!expande">
        <span style="color: black">...</span> 展开
      </div>
      <div class="expande-button" @click="expandeClick" v-else>收起</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      expande: true,
      needShowExpande: false
    }
  },
  methods: {
    expandeClick () {
      console.log('expandeClick')
      this.expande = !this.expande
    }
  },
  mounted () {
    this.$nextTick(() => {
      const lineHeight = 22
      if (this.$refs.content.offsetHeight > lineHeight * 3) {
        this.expande = false
        this.needShowExpande = true
      } else {
        this.expande = true
      }
    })
  }
}
</script>

<style lang="less" scoped>
.expande {
  height: auto;
}
.close {
  height: 65px;
  overflow: hidden;
}
</style>
