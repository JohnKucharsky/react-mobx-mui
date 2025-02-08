import { BoxProps, TypographyProps } from '@mui/material'

export const generateRandomString = (): string => {
  const length = Math.floor(Math.random() * 11) + 5
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}

export const typographyPropsObj: Record<
  'mobile' | 'desktop',
  Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps>
> = {
  mobile: {
    title: {
      variant: 'h5',
    },
    paragraph: {
      variant: 'h6',
      lineHeight: 1,
      mb: 1,
    },
    paragraphTitle: {
      variant: 'body1',
    },
  },
  desktop: {
    title: {
      variant: 'h4',
    },
    paragraph: {
      variant: 'h5',
    },
    paragraphTitle: {
      variant: 'h6',
    },
  },
}

export const boxPropsObj: Record<
  'mobile' | 'desktop',
  Record<'main' | 'address' | 'company', BoxProps>
> = {
  mobile: {
    main: { gridTemplateColumns: '7.5rem 1fr', width: '100%' },
    address: { gridTemplateColumns: '7.5rem 1fr', width: '100%' },
    company: { gridTemplateColumns: '7.5rem 1fr', width: '100%' },
  },
  desktop: {
    main: { gridTemplateColumns: '7.5rem 1fr', width: '30rem' },
    address: { gridTemplateColumns: '6.5rem 1fr', width: '25rem' },
    company: { gridTemplateColumns: '15rem 1fr', width: '40rem' },
  },
}
