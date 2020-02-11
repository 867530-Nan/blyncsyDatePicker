import {
  appReducer,
} from './app.reducer'

describe('appReducer', () => {
  it('should return the initial state if called with no arguments', () => {
    const expected = {
      useDateRange: false,
    }
    const actual = appReducer()
    expect(actual).toEqual(expected)
  })
})