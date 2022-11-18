class Observer {
  constructor (data) {
    this.walk(data)
  }
  walk (data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    this.walk(val)
    const dep = new Dep()
    const _this = this
    Object.defineProperty(data, key, {
      enumrabel: true,
      configurable: true,
      get () {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val
      },
      set (newVal) {
        if (val === newVal) {
          return
        }
        // *****重点*****
        val = newVal
        console.log('-------')
        dep.notify()
        _this.walk(newVal)
        console.log(val, newVal)
        return newVal
      }
    })
  }
}