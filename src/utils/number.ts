/**
 * 防止小数长度溢出
 * @param number 数字
 * @param dotAfter 保留小数点后几位
 * @returns 格式化后的数字
 */
export function fixNum(number: number, dotAfter = 2) {
  const times = 10 ** dotAfter
  return Math.round(number * times) / times
}
