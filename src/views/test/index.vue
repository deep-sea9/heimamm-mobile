<template>
  <div>
    <button @touchstart="recorde" @touchend="stop">按住说话</button>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
export default {
  name: '',
  data () {
    return {
      recorder: null
    }
  },
  methods: {
    recorde () {
      console.log('录音开始')
      this.recorder = new Recorder()

      this.recorder = new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1 // 声道，支持 1 或 2， 默认是1
        // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是falseS
      })

      this.recorder.start().then(
        () => {
          // 开始录音
          console.log(123)
        },
        error => {
          // 出错了
          console.log(`${error.name} : ${error.message}`)
        }
      )

      this.recorder.onprogress = function (params) {
        console.log('录音时长(秒)', params.duration)
        console.log('录音大小(字节)', params.fileSize)
        console.log('录音音量百分比(%)', params.vol)
        // console.log('当前录音的总数据([DataView, DataView...])', params.data);
      }
    },
    stop () {
      console.log('录音结束')
      // this.recorder.stop()
      // const data = this.recorder.getPCMBlob()
      const wavBlob = this.recorder.getWAVBlob()
      const renameFile = new File([wavBlob], 'audio.wav', { type: 'audio/wav' })
      console.log(renameFile)
    }
  }
}
</script>

<style lang="less" scoped></style>
