<template>
  <div class="home_div">
    <span class="iconfont back" @click="$router.back()">&#xe637;</span>
    <div id="container"></div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Mapview',
  data () {
    return {
      map: null,
      location: this.$route.query
    }
  },
  created () {},
  mounted () {
    this.initAMap()
  },
  beforeDestroy () {
    this.map.destroy()
  },
  methods: {
    initAMap () {
      AMapLoader.load({
        key: '8ef84d280bd3e1ead66dec75e6aa2301', // 设置您的key
        version: '2.0',
        plugins: ['AMap.ToolBar', 'AMap.Driving'],
        AMapUI: {
          version: '1.1',
          plugins: []
        },
        Loca: {
          version: '2.0'
        }
      })
        .then(AMap => {
          this.map = new AMap.Map('container', {
            viewMode: '3D',
            zoom: 10
          })

          // 创建一个 Marker 实例：
          // var marker = new AMap.Marker({
          //   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //   position: new AMap.LngLat(
          //     this.location.longitude,
          //     this.location.latitude
          //   )
          //   // title: '北京'
          // })

          // // 将创建的点标记添加到已有的地图实例：
          // this.map.add(marker)

          AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,
              // 定位按钮的停靠位置的偏移量
              offset: [10, 20],
              //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,
              //  定位按钮的排放位置,  RB表示右下
              position: 'RB'
            })

            geolocation.getCurrentPosition(function (status, result) {
              if (status === 'complete') {
                onComplete(result)
              } else {
                onError(result)
              }
            })

            function onComplete (data) {
              // data是具体的定位信息
            }

            function onError (data) {
              // 定位出错
            }
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style scoped lang="less">
.home_div {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  position: relative;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 50px;
    color: #000;
    width: 30px;
    height: 30px;
    z-index: 999;
  }
  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
