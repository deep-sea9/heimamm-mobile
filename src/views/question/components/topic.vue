<template>
  <div class="topic">
    <van-nav-bar
      title="标题"
      right-text="答题卡"
      left-arrow
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
