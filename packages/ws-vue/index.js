import Websocket from './Websocket.vue'
export default {
  install (Vue) {
    Vue.Component(Websocket.name, Websocket)
  }
}