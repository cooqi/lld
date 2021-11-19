import { Toast } from 'vant'
let toast

export function open (msg, loadingType) {
  toast = Toast.loading({
    duration: 0,
    forbidClick: true,
    message: msg || '加载中...',
    overlay: true,
    loadingType: loadingType || 'spinner'
  })
}
export function close () {
  toast.clear()
}
