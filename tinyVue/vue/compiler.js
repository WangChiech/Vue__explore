class Compiler {
  constructor (vm, el) {
    this.vm = vm
    this.el = el
    this.compile(this.el)
  }
  compile (node) {
    const childNodes = node.childNodes
    if (!childNodes || !childNodes.length) {
      return
    }
    Array.from(childNodes).forEach(childNode => {
      if (childNode.nodeType === 3) {
        this.compileText(childNode)
      } else {
        this.CompileElement(childNode)
      }
    })
  }
  compileText (node) {
    const reg = /\{\{(.*)\}\}$/
    if (reg.test(node.textContent)) {
      const key = RegExp.$1.trim()
      node.textContent = this.vm[key]
      new Watcher(this.vm, key, () => {
        node.textContent = this.vm[key]
      })
    }
  }
  CompileElement (node) {
    this.compile(node)
    const attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      const key = attr.value
      if (attr.name.startsWith('v-')) {
        const type = attr.name.substr(2)
        this[`${type}Update`](node, key)
      }
    })
  }
  textUpdate (node, key) {
    node.textContent = this.vm[key]
    new Watcher(this.vm, key, () => {
      node.textContent = this.vm[key]
    })
  }
  modelUpdate (node, key) {
    node.value = this.vm[key]
    new Watcher(this.vm, key, () => {
      node.value = this.vm[key]
    })
  }
}