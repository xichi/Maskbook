import { src, dest, watch } from 'gulp'
import through2 from 'through2'
import { chromium } from '../../config-overrides/manifest.overrides'
import { publicPath, distPath, ttsclib, manifestPath } from './paths'

export const copyPublic = () => src(publicPath).pipe(dest(distPath))
export const watchPublic = () => watch(publicPath, copyPublic)
// TODO: support mode
export const manifest = () =>
    src(manifestPath).pipe(
        through2
            .obj((file, _, cb) => {
                const obj = JSON.parse(file.contents.toString())
                chromium(obj)
                file.contents = Buffer.from(JSON.stringify(obj), 'utf-8')
                cb(null, file)
            })
            .pipe(dest(distPath)),
    )
export const watchManifest = () => watch(manifestPath, manifest)
export const lib = () => src(ttsclib).pipe(dest(distPath))
