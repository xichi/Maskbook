// https://wpt.fyi/results/workers/modules/dedicated-worker-import.any.html?label=master&product=chrome%5Bstable%5D&product=firefox%5Bstable%5D&product=safari%5Bstable%5D&product=chrome%5Bexperimental%5D&product=firefox%5Bexperimental%5D&product=safari%5Bexperimental%5D&aligned
// https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker

/**
 * Only Chrome supports ESModule for Worker.
 * So we bundle it.
 */
import webpack from 'webpack'
export function webpackBuilder(entry: string) {
    webpack()
}
