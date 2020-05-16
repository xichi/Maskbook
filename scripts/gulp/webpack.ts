import { existsSync, writeFileSync, mkdirSync } from 'fs'
import webpack, { Configuration } from 'webpack'
import { distPath, dependenciesESMPath, dependenciesSystemPath, tempPath } from './paths'
import { promisify } from 'util'

const dependenciesESMOut = 'umd_es.js'
const dependenciesSystemOut = 'umd_system.js'
export function ensureDepFiles() {
    if (!existsSync(tempPath)) mkdirSync(tempPath)
    if (!existsSync(dependenciesESMPath)) writeFileSync(dependenciesESMPath, '')
    if (!existsSync(dependenciesSystemPath)) writeFileSync(dependenciesSystemPath, '')
}
export function webpackDev() {
    webpack(getWebpackConfig('development', dependenciesESMPath, dependenciesESMOut)).watch({}, (handler) => {})
    webpack(getWebpackConfig('development', dependenciesSystemPath, dependenciesSystemOut)).watch({}, (handler) => {})
}
export function webpackBuild() {
    const a = promisify(webpack(getWebpackConfig('production', dependenciesESMPath, dependenciesESMOut)).run)()
    const b = promisify(webpack(getWebpackConfig('production', dependenciesSystemPath, dependenciesSystemOut)).run)()
    return Promise.all([a, b])
}
function getWebpackConfig(mode: Configuration['mode'], entry: string, out: string): Configuration {
    const isDev = mode === 'development'
    return {
        mode,
        entry,
        devtool: isDev ? 'cheap-source-map' : false,
        optimization: { splitChunks: false },
        output: {
            path: distPath,
            filename: out,
            library: '__deps__',
            libraryTarget: 'global',
            globalObject: 'globalThis',
        },
        externals: [
            {
                // react: 'React',
                // 'react-dom': 'ReactDOM'
            },
        ],
        watch: isDev,
    }
}
