import { reactive, watchEffect, watch, computed } from './vue'

const btnA = document.querySelector('#btnA')
const btnB = document.querySelector('#btnB')
const btnC = document.querySelector('#btnC')

// 数据劫持
const state = reactive({
  a: 1,
  b: {
    c: 2
  }
})

// 计算数值
const res = computed(() => state.a + state.b.c)

// 点击按钮A 状态a改为100
btnA.addEventListener(
  'click',
  () => {
    state.a = 100
    console.log('computed =>', res.value)
  },
  false
)

// 点击按钮B 状态b.c改为200
btnB.addEventListener(
  'click',
  () => {
    const b = state.b // b: Proxy({ c: 2 })
    b.c = 200
    console.log('computed =>', res.value)
  },
  false
)

// 点击按钮C 输出当前state对象
btnC.addEventListener(
  'click',
  () => {
    console.log(state)
  },
  false
)

// 自动收集依赖
// watchEffect 需要先执行一次 第一次执行获取state.a时 会触发Proxy的getter函数 此处做一下回调函数的依赖收集
// 此后每次setter函数触发时 都通知所有依赖中的回调执行一遍 发布-订阅者模型
watchEffect((a, b) => {
  console.log('watchEffect => state.a', state.a)
})

watchEffect(() => {
  console.log('watchEffect => state.b.c', state.b.c)
})

// 手动设置依赖
watch(
  () => state.a,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    console.log('watch => state.a', state.a)
  }
)

watch(
  () => state.b.c,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    console.log('watch => state.b.c', state.b.c)
  }
)
