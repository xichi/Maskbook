import { src, dest, parallel } from 'gulp'
import { ttsclib, distPath, browserPolyfill } from './paths'
import { promisify } from 'util'

const ttsc = () => src(ttsclib).pipe(dest(distPath))
const browser = () => src(browserPolyfill).pipe(dest(distPath))
export const libs = () => promisify(parallel(ttsc, browser))()
