import { Typography } from '@mui/material'

export default function NoItems({
  length,
  title,
  loading,
}: {
  length: number | undefined
  title: string
  loading: boolean
}) {
  if (length === 0 && !loading) {
    return (
      <Typography
        sx={{
          py: 10,
        }}
        variant="h3"
        fontWeight="normal"
        align="center"
      >
        {title}
      </Typography>
    )
  }
  return null
}
