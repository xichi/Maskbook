import { join } from 'path'

export const QRWorkerEntry = abs('../../src/web-workers/QRCode.ts')
export const CryptoWorkerEntry = abs('../../src/modules/CryptoAlgorithm/EllipticBackend/worker.ts')

export const publicPath = abs('../../public/**/*')
export const manifestPath = abs('../../src/manifest.json')
export const tsconfigESMPath = abs('../../tsconfig.esm.json')
export const tsconfigSystemPath = abs('../../tsconfig.system.json')

export const tempPath = abs('../../temp/')
export const distPath = abs('../../temp/develop')
export const buildPath = abs('../../temp/build')
export const esmBuildPath = abs('../../temp/esm/')
export const systemBuildPath = abs('../../temp/system/')
export const dependenciesESMPath = abs('../../temp/__deps__esm__generated__.js')
export const dependenciesSystemPath = abs('../../temp/__deps__system__generated__.js')

export const ttsclib = abs('../../node_modules/@magic-works/ttypescript-browser-like-import-transformer/es/ttsclib.*')
export const browserPolyfill = abs('../../node_modules/webextension-polyfill/dist/browser-polyfill.min.*')
function abs(x: string) {
    return join(__dirname, x)
}
