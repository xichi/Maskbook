import { src, series, symlink } from 'gulp'
import { promisify } from 'util'
import { statSync, mkdirSync } from 'fs'
import { distPath, esmBuildPath, systemBuildPath } from './paths'
import { join } from 'path'

//#region symlink
const createSymlinkFn = (path: string, to: string) => () => {
    try {
        statSync(path).isDirectory()
    } catch (e) {
        mkdirSync(path)
    }
    return src(path).pipe(symlink(join(distPath, to)))
}
export const createESMSymlink = () => createSymlinkFn(esmBuildPath, 'esm')()
export const createSystemSymlink = () => createSymlinkFn(systemBuildPath, 'system')()
export const createSymlink = promisify(series(createESMSymlink, createSystemSymlink))
//#endregion
