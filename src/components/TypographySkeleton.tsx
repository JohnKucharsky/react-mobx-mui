import { PropsWithChildren } from 'react'
import { Box, Skeleton, Typography, TypographyProps } from '@mui/material'

export default function TypographySkeleton({
  children,
  ...props
}: TypographyProps & PropsWithChildren) {
  if (children) {
    return <Typography {...props}>{children}</Typography>
  }

  if (props.variant === 'h4') {
    return (
      <Box display={'flex'} flexDirection={'row'} gap={2} {...props}>
        <Skeleton width="6rem" height="2.2rem" variant={'rounded'} />
        <Skeleton width="6rem" height="2.2rem" variant={'rounded'} />
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Skeleton width="8rem" height="1.5rem" variant={'rounded'} />
    </Box>
  )
}
