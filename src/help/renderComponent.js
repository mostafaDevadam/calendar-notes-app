import { createApp, createVNode, render } from 'vue'


export function renderComponent({ el, component, props, appContext }) {
    let app = createApp(component, props)
    Object.assign(app._context, appContext) // must use Object.assign on _context
    app.mount(el)

    return () => {
        // destroy app/component
        app?.unmount()
        app = undefined
    }
}


export function renderComponent2({ el, component, props, appContext }) {
    let vnode = createVNode(component, props)
    vnode.appContext = { ...appContext }
    render(vnode, el)

    return () => {
        // destroy vnode
        render(null, el)
        vnode = undefined
    }
}
