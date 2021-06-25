/** * 验证手机号
 * @param {number} phone 手机号
 */
export function validatePhone(phone: string): boolean {
  return /^1\d{10}$/.test(phone)
}

/**
 * 验证邮箱是否合格
 * @param mail 邮箱
 */
export function validateEmail(mail: string) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)
}
