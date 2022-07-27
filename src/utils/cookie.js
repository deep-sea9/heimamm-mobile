import jsCookie from 'js-cookie'
// 获取
export function getCookie (key) {
  console.log(jsCookie.get(key))
  return jsCookie.get(key)
}
// 设置
export function setCookie (key, value) {
  jsCookie.set(key, value)
}
// 删除
export function removeCookie (key) {
  jsCookie.remove(key)
}
