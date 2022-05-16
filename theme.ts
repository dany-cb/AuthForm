import { extendTheme } from '@chakra-ui/react'
import { blue, blueDark } from '@radix-ui/colors'
import { mode } from '@chakra-ui/theme-tools'

const formatRadixToChakra = (scale: { [key: string]: string }) => {
  const chakraColors = Object.values(scale).reduce(
    (accumulator, currentValue, index) => {
      accumulator[index + 1] = currentValue
      return accumulator
    },
    {}
  )
  return chakraColors as { [key: number]: string }
}

const customTheme = extendTheme({
  colors: {
    blue: formatRadixToChakra(blue),
    blueD: formatRadixToChakra(blueDark)
  },
  components: {
    Heading: {
      variants: {
        form: (props) => ({
          color: mode('blue.12', 'blueD.12')(props)
        })
      }
    },
    FormLabel: {
      variants: {
        float: {
          top: -5,
          transform: 'scale(0.75)',
          transformOrigin: 'left center',
          bg: 'white',
          zIndex: 2,
          px: 1
        }
      }
    }
  }
})

export default customTheme
