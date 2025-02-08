import { TableBody, TableCell, TableRow, Typography } from '@mui/material'

export default function TableEmptyText({
  colSpan,
  title,
}: {
  colSpan: number
  title: string
}) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Typography
            sx={{
              py: 10,
            }}
            variant="h4"
            align="center"
            color={'textSecondary'}
          >
            {title}
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
