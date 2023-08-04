//节流
export const throttle = (fn: Function, time: number) => {
  let timer: number | undefined = undefined
  return (...args: any[]) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout(() => {
        timer = undefined
      }, time)
    }
  }
}
