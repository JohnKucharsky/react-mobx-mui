import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { useParams } from 'react-router'
import { $user, getUserFx } from '@/features/user-details/data/api.ts'
import { userDetailedStarted } from '@/features/user-details/data/initializers.ts'
import DetailsCard from '@/features/user-details/DetailsCard.tsx'
import Posts from '@/features/user-details/Posts.tsx'

export default function UserDetails() {
  const [pageStarted, userData, pending] = useUnit([
    userDetailedStarted,
    $user,
    getUserFx.pending,
  ])

  const params = useParams()

  useEffect(() => {
    pageStarted(params.userId)
  }, [pageStarted, params.userId])

  if (!userData && !pending) {
    return <Typography variant={'h3'}>No user with this ID</Typography>
  }

  return (
    <Box px={{ xs: 1, md: 2 }} py={2}>
      <DetailsCard />
      <Posts mt={2} />
    </Box>
  )
}
