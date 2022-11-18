class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    Dep.target = this
    let oldValue = this.vm[key]
    Dep.target = null
  }
  update () {
    this.cb && this.cb(this.vm[this.key])
  }
}