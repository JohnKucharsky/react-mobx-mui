import CloseIcon from '@mui/icons-material/Close'
import { Box, DialogContent, DialogTitle } from '@mui/material'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { object } from 'yup'
import DialogActionsEl from '@/components/DialogActionsEl'
import CloseButton from '@/components/StyledComponents/CloseButton.tsx'
import { userInputOutput } from '@/features/users/data/input-output'
import { useYupSchemaUsers } from '@/features/users/data/service'
import { usersStore } from '@/features/users/data/store.ts'
import { type User } from '@/features/users/data/types'
import FormFields from '@/features/users/FormFields.tsx'

const Edit = observer(function Edit({
  handleEditClose,
  initialValues,
}: {
  handleEditClose: () => void
  initialValues: User
}) {
  const { t } = useTranslation()
  const schema = useYupSchemaUsers()

  const handleCreateSuccess = () => {
    handleEditClose()
  }

  return (
    <>
      <CloseButton onClick={handleEditClose} color={'primary'}>
        <CloseIcon />
      </CloseButton>

      <DialogTitle
        sx={{
          px: { xs: 1, md: 2 },
        }}
      >
        {t('Edit')}
      </DialogTitle>
      <Formik
        initialValues={userInputOutput.getInitialValues(initialValues)}
        validationSchema={object().shape(schema)}
        onSubmit={async (
          { submit: _submit, ...restValues },
          { resetForm, setErrors },
        ) => {
          try {
            await usersStore.editUser(
              userInputOutput.formatValues(restValues),
              initialValues.id,
            )

            resetForm()
            handleCreateSuccess()
          } catch (err) {
            if (err instanceof Error) {
              setErrors({
                submit: err.message,
              })
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{
                px: { xs: 1, md: 2 },
                py: 1,
              }}
            >
              <Box display={'grid'} gap={1}>
                <FormFields
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Box>
            </DialogContent>
            <DialogActionsEl
              submit={errors.submit}
              isSubmitting={usersStore.usersLoading}
              buttonTitle={t('Edit')}
              testKey={'edit-button'}
            />
          </form>
        )}
      </Formik>
    </>
  )
})

export default Edit
