import Dep from './Dep'

const dep = new Dep()

export function reactive(data) {
  return new Proxy(data, {
    get: function (target, key) {
      const value = Reflect.get(target, key)
      dep.collect(target, key)
      console.log(`Success get ${key}`)
      return value !== null && typeof value === 'object' ? reactive(value) : value
    },
    set: function (target, key, value) {
      const oldVal = Reflect.get(target, key) // 保存旧值 以供副作用读取
      const res = Reflect.set(target, key, value)
      if (res) {
        dep.notify(target, key, value, oldVal)
        console.log(`Success set ${key} ${value}`)
        return res
      } else {
        throw new Error('Error')
      }
    }
  })
}
