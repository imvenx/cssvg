import { svgEl } from "./anim_m"
import { ConfigM } from "./config_m"
import { allowedEls } from "./constants"
import { eapi } from "./eapi_m"
import { getSvEls, svEl, svgString } from "./svel_m"

export const svgIO = {
    async input(): Promise<void> {
        /* TODO: Investigate why input is sometimes called after output, (probably watcher 
         problem on electron-main) */
        const file = await eapi.getSvg(ConfigM.filePath) ?? {}
        if (!file) return

        let svgContainer = document.createElement('div')
        svgContainer.innerHTML = file
        let svg = svgContainer.children[0] as SVGElement

        svg.removeChild(svg.getElementsByTagName('sodipodi:namedview')[0])

        const _svEl = getSvEls(svg)

        svgString.value = file
        svEl.value = _svEl
    },
    async output(): Promise<void> {
        const _svgEl = svgEl()?.cloneNode(true) as Element
        if (!_svgEl) return
        let newFile = (await cssToSvg(_svgEl))?.outerHTML
        await eapi.updateFile(newFile)
    }
}

export async function cssToSvg(_el: Element): Promise<Element> {
    let el = _el as any

    await Array.from(el.children).forEach(async (child) =>
        await cssToSvg(child as Element))

    if (!allowedEls.includes(el.tagName)) return el

    let x = el.style.x
    if (x) { el.setAttribute('x', x); el.style.x = '' }

    let y = el.style.y
    if (y) { el.setAttribute('y', y); el.style.y = '' }

    let width = el.style.width
    if (width) {
        if (el.tagName !== 'svg') el.setAttribute('width', width.replace('px', ''));
        el.style.width = ''
    }

    let height = el.style.height
    if (height) {
        if (el.tagName !== 'svg') el.setAttribute('height', height.replace('px', ''));
        el.style.height = ''
    }

    let transform = el.style.transform
    if (transform) { el.setAttribute('transform', transform); el.style.transform = '' }

    let d = el.style.d
    if (d) {
        d = d.replace('path("', '').replace('")', '');
        el.setAttribute('d', d)
        el.style.d = ''
    }

    return el
}