import { createApp } from 'vue'
import App from './App.vue'
import './config/kun'
import run from '@/config/kun.js'
import router from '@/router/index'
import { store } from '@/pinia'
// import { auth } from '@/directive/auth'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'
import './style/element_visiable.scss'
import { initDom } from './utils/positionToCode'

// initDom()

console.log("welcome Lottery Recommdation Page")

const app = createApp(App)

app
    .use(run)
    .use(store)
    // .use(auth)
    .use(router)
    .mount('#app')

export default app