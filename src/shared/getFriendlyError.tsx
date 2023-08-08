const map: Record<string, string> = {
  'is invalid': '格式不正确',
}
export const getFriendlyError = (error: string) => {
  //映射后端传来的报错信息
  return map[error] || error
}
