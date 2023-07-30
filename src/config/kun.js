import { register } from './global'

export default {
    install: (app) => {
        register(app)
        console.log(`
            打个响指吧，吹起小喇叭，嗒嘀嗒嘀嗒。
        `)
    }
}