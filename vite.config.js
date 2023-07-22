import vuePlugin from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({
    command,
    mode
}) => {
    
    const config = {
        base: './',
        root: './',
        plugins: [
            vuePlugin()
        ]
    }

    config.plugins.push(AutoImport({
        resolvers: [ElementPlusResolver()]
    }),
    Components({
        resolvers: [ElementPlusResolver({
            importStyle: 'saas'
        })]
    }))
    return config;
}