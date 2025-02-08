import { Box, Card, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'

export const GridSkeletons = ({ skeletonNum }: { skeletonNum: number }) => {
  return (
    <Grid container spacing={1}>
      {Array(skeletonNum)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <CardElement />
          </Grid>
        ))}
    </Grid>
  )
}

const CardElement = () => {
  const generateRandomWidth = () =>
    `${Math.floor(Math.random() * (90 - 65 + 1) + 65)}%`

  return (
    <Card elevation={3}>
      <Box p={1.5} width={'100%'}>
        <Skeleton variant={'rounded'} width={'70%'} />
      </Box>

      <Box px={1.5} pb={1.5} display={'grid'} gap={1}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            variant={'rounded'}
            width={generateRandomWidth()}
          />
        ))}
      </Box>
    </Card>
  )
}
