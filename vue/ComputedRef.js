export default class ComputedRef {
  constructor(value) {
    this._value = value
  }

  get value() {
    return this._value
  }

  set value(newVal) {
    this._value = newVal
    return true
  }
}
