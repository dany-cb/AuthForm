/**
 * Returns val1 if in development else val2
 */
export default <Type>(val1: Type, val2: Type) => {
  return process.env.NODE_ENV === 'development' ? val1 : val2
}
