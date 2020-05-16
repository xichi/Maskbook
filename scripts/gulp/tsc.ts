import { parallel } from 'gulp'
import { spawn } from 'child_process'
import { promisify } from 'util'
import { tsconfigESMPath, tsconfigSystemPath } from './paths'
const tsc = (tsconfig: string, watch: boolean) => () =>
    spawn(`yarn`, ['ttsc', '-p', tsconfig, watch ? ' -w' : ''], {
        stdio: 'inherit',
        cwd: process.cwd(),
        shell: true,
    })
export const tscESModuleWatch = () => tsc(tsconfigESMPath, true)()
export const tscESModuleBuild = () => tsc(tsconfigESMPath, false)()
export const tscSystemWatch = () => tsc(tsconfigSystemPath, true)()
export const tscSystemBuild = () => tsc(tsconfigSystemPath, false)()
export const tscWatch = promisify(parallel(tscSystemWatch, tscESModuleWatch))
export const tscBuild = promisify(parallel(tscESModuleBuild, tscSystemBuild))
