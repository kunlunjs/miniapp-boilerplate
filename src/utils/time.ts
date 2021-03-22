/**
 * 等待一段时间
 * @param millisecond 毫秒
 */
export function sleep(millisecond: number) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), millisecond))
}
