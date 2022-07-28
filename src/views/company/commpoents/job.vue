<template>
  <div>
    <van-popup
      :v-model="isshow"
      round
      position="bottom"
      :close-on-click-overlay="false"
      @click-overlay="close"
    >
      <van-area
        title="标题"
        :area-list="areaList"
        columns-num="1"
        @cancel="close"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    isshow: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      areaList: {
        province_list: this.list
      }
    }
  },
  created () {
    console.log(this.list)
  },
  methods: {
    close () {
      this.$emit('update:isshow', false)
    }
  }
}
</script>

<style></style>
