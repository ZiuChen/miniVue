import Dep from './Dep'
import ComputedRef from './ComputedRef'

export function watchEffect(callback) {
  Dep.effectCallback = callback
  // 触发state.a 的 getter => collect state.a : [callback]
  // 当state.a 的 setter => notify state.a : [callback]
  callback() // 立即执行 收集依赖
  Dep.effectCallback = null // 清除引用
}

export function watch(depFn, callback) {
  Dep.effectCallback = callback
  depFn() // callback不执行 而是depFn执行 触发 getter 收集依赖
  Dep.effectCallback = null // 清除引用
}

export function computed(callback) {
  Dep.effectCallback = callback

  // 每次 setter 触发时 不仅要通知副作用执行 并且将计算值更新到 computedRef 内的value
  const value = callback() // 获得函数计算返回值
  const computedRef = new ComputedRef(value)

  // 为callback添加属性`computedRef` 值为computedRef
  Object.defineProperty(callback, 'computedRef', {
    value: computedRef
  })

  Dep.effectCallback = null // 清除引用

  return computedRef
}
