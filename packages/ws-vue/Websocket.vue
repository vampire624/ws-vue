<script>
export default {
  name: 'ws-vue',
  props: {
    /* 传入的 ws(s) 地址，生产环境下只需要传入 相对路径 */
    uri: {
      type: String,
      default: ''
    }
  },
  render () {
	  return this.$slots.default // 渲染插槽内容
  },
  data () {
    return {
      websock: null // websocket 实例
    }
  },
  watch: {
    /* 监听 props 的  uri 变化重新连接 websocket */
    uri: {
      immediate: true,
      handler () {
        this.close()
        this.initWebsocket()
      }
    }
  },
  beforeDestroy () {
    /* 组件销毁，关闭连接 */
    this.close()
  },
  methods: {
    /**
    * @Description: 初始化 websocket
    * @param {  }
    * @return: undefined
    */
    initWebsocket () {
      if (!this.uri) return undefined
      if (!WebSocket) {
        console.log('您当前的浏览器不支持实时数据，建议使用最新版Chrome浏览器')
      } else {
        this.websock = new WebSocket(this.uri)
        this.websock.onmessage = this.websocketOnMessage
        this.websock.onopen = this.websocketOnOpen
        this.websock.onerror = this.websocketOnError
        this.websock.onclose = this.websocketClose
      }
    },
    /**
    * @Description: websocket 连接成功的回调函数
    * @param {  }
    * @return: undefined
    */
    websocketOnOpen () {
      this.$emit('websocket-onopen')
    },
    /**
    * @Description: websocket 连接出错的回调函数
    * @param {  }
    * @return: undefined
    */
    websocketOnError () {
      this.$emit('websocket-onerror')
    },
    /**
    * @Description: websocket 收到 message 的回调函数
    * @param {  }
    * @return: undefined
    */
    websocketOnMessage (event) {
      this.$emit('websocket-onmessage', event)
    },
    /**
    * @Description: websocket 关闭的回调函数
    * @param {  }
    * @return: undefined
    */
    websocketClose (event) {
      this.$emit('websocket-onclose', event)
    },
    /**
    * @Description: websocket 发送数据方法（供父组件使用）
    * @param {  }
    * @return: undefined
    */
    send (data) {
      this.websock && this.websock.send(data)
    },
    /**
    * @Description: websocket 关闭 websocket 方法（供父组件使用）
    * @param {  }
    * @return: undefined
    */
    close () {
      this.websock && this.websock.close()
    }
  }
}
</script>
