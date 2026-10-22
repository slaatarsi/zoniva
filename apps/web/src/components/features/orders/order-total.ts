/** Display-only total in integer cents (avoids float drift); the server computes the stored total. */
export function previewTotal(price: string, quantity: number): string {
  const [whole, frac = ''] = price.split('.')
  const cents = BigInt(whole + frac.padEnd(2, '0').slice(0, 2)) * BigInt(quantity)
  const abs = cents.toString().padStart(3, '0')
  return `${abs.slice(0, -2)}.${abs.slice(-2)}`
}
