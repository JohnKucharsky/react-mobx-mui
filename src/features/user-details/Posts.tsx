import { useMemo } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  BoxProps,
  Skeleton,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import TypographySkeleton from '@/components/TypographySkeleton.tsx'
import Comment from '@/features/user-details/Comment.tsx'
import { typographyPropsObj } from '@/features/user-details/data/service.tsx'
import { useRootStore } from '@/stores/RootStore.tsx'
import { addTestKey } from '@/utils/test-keys.ts'

const Posts = observer(function Posts({ ...props }: BoxProps) {
  const { userDetailsStore } = useRootStore()

  const { t } = useTranslation()
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const typographyProps = useMemo(
    (): Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps> =>
      isDownMd ? typographyPropsObj.mobile : typographyPropsObj.desktop,
    [isDownMd],
  )

  return (
    <Box {...props}>
      <TypographySkeleton
        {...typographyProps.title}
        fontWeight={'bold'}
        mb={2}
        mt={3}
      >
        {t('Posts')}
      </TypographySkeleton>
      {userDetailsStore.userLoading && !userDetailsStore.user && (
        <AccordionSkeleton />
      )}
      {userDetailsStore.user?.posts.map((post) => (
        <Accordion elevation={3} key={post.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              {...addTestKey('posts')}
              {...typographyProps.paragraphTitle}
              fontWeight={'bold'}
            >
              {post.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {post.body}
            <TypographySkeleton
              {...typographyProps.paragraphTitle}
              fontWeight={'bold'}
              mt={3}
              ml={2}
            >
              {t('Comments')}:
            </TypographySkeleton>
            <List sx={{ width: '100%', maxWidth: '60rem' }}>
              {userDetailsStore.comments?.[post.id].map((comment, idx, arr) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  last={idx === arr.length - 1}
                />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
})
export default Posts

const AccordionSkeleton = () => {
  return Array(10)
    .fill(0)
    .map((_, i) => (
      <Accordion elevation={3} key={i}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Skeleton width={'60%'} height={'2.5rem'} />
        </AccordionSummary>
      </Accordion>
    ))
}
