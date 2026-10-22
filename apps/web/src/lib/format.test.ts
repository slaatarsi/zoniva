import { describe, expect, it } from 'vite-plus/test'
import { formatMoney, formatRadius } from './format'

describe('format', () => {
  it('formats money with exactly two decimals', () => {
    expect(formatMoney('1234.5')).toBe('1,234.50')
    expect(formatMoney(0.1 + 0.2)).toBe('0.30')
  })
  it('keeps meters below 1 km and switches to km above', () => {
    expect(formatRadius(999)).toBe('999 m')
    expect(formatRadius(1500)).toBe('1.5 km')
    expect(formatRadius(12_345)).toBe('12.35 km')
  })
})
