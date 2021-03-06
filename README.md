# ws-vue 组件

`vue` 的 `Websocket` 组件，封装了原生 `Websocket` 的方法和事件。

## Install
```bash
npm i ws-vue -S
```

## Usage
```js
import Vue from 'vue'
import WsVue from 'ws-vue'
Vue.use(WsVue)
```

```html
<ws-vue ref="ws" :url="uri" @websocket-onmessage="handleOnMessage"></ws-vue>
```
```js
// 发送事件

this.$refs['ws'].send('this is a message')
// 接收事件
methods: {
  ...
  handleOnMessage(event) {
    console.log(event.data)
  }
  ...
}
```

## Props
 **uri**：传入的 `websocket` 的完整地址，包括协议、主机、端口与路径（ws://localhost:8080/websocket/xxx）

## Events
 **websocket-onopen**：`websocket` 连接成功触发的自定义事件

**websocket-onclose**：`websocket` 连接关闭触发的自定义事件

**websocket-onmessage**：`websocket` 接收消息的自定义事件，回调函数参数 `event` 为事件对象，获取数据使用 `event.data`

**websocket-onerror**：`websocket` 连接错误（失败）触发的自定义事件

## Methods
**send**： 发送数据方法，使用方法：`this.$refs.xxx.send(data)` ， 父组件通过 `$refs` 获取子组件使用

**close**： 主动关闭 `websocket` 连接的方法，调用方法同上（切换 `websocket` 地址，无需主动调用 `close` 方法，直接更新 `uri` 即可，组件会关闭上一个连接，并以新 `uri` 重新初始化 `Websocket`）
