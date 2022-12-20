/*
  WeakMap {
    data: Map {
      a: Set [cb1, cb2],
      { c: 1 }: Set [cb1, cb2, cb3]
    }
  }

 */

export default class Dep {
  static effectCallback = null

  constructor() {
    this.effectMap = new WeakMap()
  }

  collect(target, key) {
    const { effectCallback } = Dep
    if (effectCallback) {
      let depMap = this.effectMap.get(target) // 获取当前的依赖对象
      // 尚未创建依赖关系Map, 创建depMap
      if (!depMap) {
        depMap = new Map()
        this.effectMap.set(target, depMap)
      }

      let deps = depMap.get(key) // 获取当前key的所有副作用(依赖)
      // 尚未创建存放副作用的Set
      if (!deps) {
        deps = new Set()
        depMap.set(key, deps)
      }

      deps.add(effectCallback) // 收集依赖
    }
  }

  notify(target, key, value, oldVal) {
    const depMap = this.effectMap.get(target)

    if (!depMap) return

    const deps = depMap.get(key)
    deps.forEach((dep) => {
      const computedVal = dep(value, oldVal) // 执行每个副作用 并且获取副作用执行返回的计算值
      if (dep.computedRef) {
        dep.computedRef.value = computedVal // 如果有 证明是一个计算值 更新此计算值
      }
    })
  }
}
