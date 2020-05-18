import { LiveSelector, MutationObserverWatcher } from '@holoflows/kit/es'
import { timeout } from '../../../utils/utils'

const oldFacebook = new LiveSelector().querySelector('#contentArea').getElementsByTagName('p')
const newFacebook = new LiveSelector().querySelector<HTMLElement>('[data-ad-preview="message"]')
export async function getPostContentFacebook(): Promise<string> {
    return get(oldFacebook.concat(newFacebook))
}
async function get(post: LiveSelector<HTMLElement>) {
    const [data] = await timeout(new MutationObserverWatcher(post), 10000)
    return data.innerText
}
