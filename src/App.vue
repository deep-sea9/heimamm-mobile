<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.app {
  background-color: #f7f4f5;
  height: 100vh;
}
</style>
