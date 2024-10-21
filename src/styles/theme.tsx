import { extendTheme } from '@chakra-ui/react'
import { config } from 'typescript-eslint'

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Heading Font Name', Pretendard`,
    body: `'Body Font Name', Pretendard`,
  },
})

export default theme