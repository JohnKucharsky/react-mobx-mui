import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router'
import DetailsCard from '@/features/user-details/DetailsCard.tsx'
import Posts from '@/features/user-details/Posts.tsx'
import { useRootStore } from '@/stores/RootStore.tsx'

const UserDetails = observer(function UserDetails() {
  const { userDetailsStore } = useRootStore()

  const params = useParams()

  useEffect(() => {
    userDetailsStore.fetchUser({ id: params.id }).catch(console.error)
    userDetailsStore.fetchComments()
  }, [params.id, params.userId, userDetailsStore])

  if (!userDetailsStore.user && !userDetailsStore.userLoading) {
    return <Typography variant={'h3'}>No user with this ID</Typography>
  }

  return (
    <Box px={{ xs: 1, md: 2 }} py={2}>
      <DetailsCard />
      <Posts mt={2} />
    </Box>
  )
})

export default UserDetails
