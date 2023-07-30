import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import vuePlugin from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import fullImportPlugin from './vitePlugin/fullImport/fullImport.js'

export default ({
    command,
    mode
}) => {
    const NODE_ENV = process.env.NODE_ENV || 'development'
    const envFiles = [
        `.env.${NODE_ENV}`
    ]
    for (const file of envFiles) {
        const envConfig = dotenv.parse(fs.readFileSync(file))
        for (const e in envConfig) {
            process.env[e] = envConfig[e]
        }
    }


    const alias = {
        '@': path.resolve(__dirname, './src'),        
    }

    const config = {
        base: './',
        root: './',
        resolve: {
            alias,
        },
        define: {
            'process.env': {}
        },
        server: {
            open: true,
            port: process.env.VITE_CLI_PORT,
            proxy: {
                [process.env.VITE_BASE_API]: {
                    target: `${process.env.VITE_BASE_PATH}:${process.env.VITE_SERVER_PORT}/`,
                    changeOrigin: true,
                    rewrite: path => path.replace(new RegExp('^' + process.env.VITE_BASE_API), ''),
                }
            }
        },
        plugins: [
            vuePlugin()
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/style/element/index.scss" as *;`,
                }
            }
        },
    }

    if (NODE_ENV === 'development') {
        config.plugins.push(
          fullImportPlugin()
        )
    } else {
        config.plugins.push(AutoImport(
        {
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver({
                importStyle: 'sass'
        })]
    }))
    }
    return config;
}