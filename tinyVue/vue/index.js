class Vue {
  constructor (options) {
    this.$options = options || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this.$data = this.$options.data || {}
    this.proxyData(this.$data)
    new Observer(this.$data)
    new Compiler(this, this.$el)
  }
  proxyData (data) {
    Object.keys(data).forEach(item => {
      Object.defineProperty(this, item, {
        enumrable: true,
        configurable: true,
        get () {
          return data[item]
        },
        set (val) {
          data[item] = val
        }
      })
    })
  }
}