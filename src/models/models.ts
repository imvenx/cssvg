// export interface SvEl {
//     id: string
//     name: string
//     tagName: string
//     isCollapsed: boolean
//     children: SvEl[]
// }

// export interface IListEl {
//     icon: string
//     name: string
//     isCollapsed: boolean
//     keyframes: [{ key: string, value: string }]
// }

export interface SvEl {
    attrs: KeyVal[]
    children?: SvEl[]
    depth: number
    id: string
    isUncollapsed: boolean
    kfs: Keyframe[]
    // anims: Animation[]
    name?: string
    showAttrs: boolean
    tagName: string
}

export interface KeyVal {
    key: string
    val: string
}