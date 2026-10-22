import { describe, expect, it } from 'vite-plus/test'
import { previewTotal } from './order-total'

describe('previewTotal', () => {
  it('multiplies without float drift', () => {
    expect(previewTotal('0.10', 3)).toBe('0.30')
    expect(previewTotal('19.99', 7)).toBe('139.93')
    expect(previewTotal('5', 2)).toBe('10.00')
    expect(previewTotal('0.05', 1)).toBe('0.05')
  })
})
