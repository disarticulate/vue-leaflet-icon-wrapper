import {
  formatNum
} from './source/utils'
expect.extend({
  toEqualCloseTo(received, expected, precision = 6) {
    function round(obj) {
      if (Array.isArray(obj)) {
        return obj.map(round)
      }
      if (typeof obj === 'function') {
        return round(obj())
      }
      if (typeof obj === 'object') {
        return Object.keys(obj || {}).reduce((acc, key) => {
          acc[key] = round(obj[key])
          return acc
        }, {})
      }
      if (typeof obj === 'number') {
        return formatNum(obj, precision)
      }
      return obj
    }

    expect(round(expected)).toEqual(round(received))

    return { pass: true }
  },
})