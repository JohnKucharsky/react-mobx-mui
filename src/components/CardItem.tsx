import { Box, Typography } from '@mui/material'

export default function CardItem({
  title,
  text,
}: {
  title: string
  text?: string
}) {
  return (
    <Box mb={1}>
      <Typography variant={'caption'} lineHeight={'normal'}>
        {title}
      </Typography>
      <Typography
        sx={{ whiteSpace: 'pre-line' }}
        lineHeight={'normal'}
        variant={'h6'}
      >
        {text}
      </Typography>
    </Box>
  )
}
