import { promisify } from 'util'
import { parallel } from 'gulp'
import { watchManifest, watchPublic, copyPublic, manifest } from './copy-assets'
import { createSymlink } from './symlinks'
import { ensureDepFiles, webpackDev, webpackBuild } from './webpack'
import { tscBuild, tscWatch } from './tsc'
import { libs } from './libs'

export async function watch() {
    await prepare()
    return promisify(parallel(watchManifest, watchPublic, webpackDev, tscWatch))()
}

export async function prepare() {
    ensureDepFiles()
    await createSymlink()
    return promisify(parallel(manifest, copyPublic, libs))()
}

export async function build() {
    await prepare()
    await tscBuild()
    await webpackBuild()
}

export default watch
export * from './copy-assets'
export * from './paths'
export * from './symlinks'
export * from './tsc'
export * from './webpack'
