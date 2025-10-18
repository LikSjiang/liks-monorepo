/**
 * 验证值是否不为空
 * @param value 要验证的值
 * @returns 如果值不为空则返回 true，否则返回 false
 */
export function isNotEmpty(value: undefined | null | string | number): boolean {
  const emptyValues = [undefined, null, '', NaN];
  // 检查值是否在空值列表中
  return !emptyValues.includes(value);
}
/**
 * 验证值是否为空
 * @param value 要验证的值
 * @returns 如果值为空则返回 true，否则返回 false
 */
export function isEmpty(value: undefined | null | string | number): boolean {
  return !isNotEmpty(value);
}
