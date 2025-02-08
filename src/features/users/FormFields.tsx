import { type ChangeEvent, type FocusEvent } from 'react'
import { type FormikErrors, type FormikTouched } from 'formik'
import { useTranslation } from 'react-i18next'
import OutlinedInputEl from '@/components/DataInputs/OutlinedInputEl'
import PhoneNumberInputEl from '@/components/DataInputs/PhoneNumberInputEl.tsx'
import { UserFields } from '@/features/users/data/input-output.ts'

export default function FormFields({
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
}: {
  touched: FormikTouched<UserFields>
  errors: FormikErrors<UserFields>
  values: UserFields
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (
    e: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
      Element
    >,
  ) => void
}) {
  const { t } = useTranslation()

  return (
    <>
      <OutlinedInputEl
        touched={touched.name}
        error={errors.name}
        label={t('Name')}
        name={'name'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.name}
        required
        size={'small'}
        testKey={'name-field'}
      />

      <OutlinedInputEl
        touched={touched.userName}
        error={errors.userName}
        label={t('userName')}
        name={'userName'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.userName}
        required
        size={'small'}
        testKey={'username-field'}
      />

      <OutlinedInputEl
        touched={touched.email}
        error={errors.email}
        label={t('Email')}
        name={'email'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.email}
        size={'small'}
        testKey={'email-field'}
      />

      <PhoneNumberInputEl
        touched={touched.phone}
        error={errors.phone}
        label={t('phoneNumber')}
        name={'phone'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.phone}
        testKey={'phone-field'}
      />

      <OutlinedInputEl
        touched={touched.website}
        error={errors.website}
        label={t('Website')}
        name={'website'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.website}
        size={'small'}
        testKey={'website-field'}
      />

      <OutlinedInputEl
        touched={touched.street}
        error={errors.street}
        label={t('Street')}
        name={'street'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.street}
        size={'small'}
        testKey={'street-field'}
      />

      <OutlinedInputEl
        touched={touched.suite}
        error={errors.suite}
        label={t('Suite')}
        name={'suite'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.suite}
        size={'small'}
        testKey={'suite-field'}
      />

      <OutlinedInputEl
        touched={touched.city}
        error={errors.city}
        label={t('City')}
        name={'city'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.city}
        size={'small'}
        testKey={'city-field'}
      />

      <OutlinedInputEl
        touched={touched.zipcode}
        error={errors.zipcode}
        label={t('ZipCode')}
        name={'zipcode'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.zipcode}
        size={'small'}
        testKey={'zipcode-field'}
      />

      <OutlinedInputEl
        touched={touched.companyName}
        error={errors.companyName}
        label={t('companyName')}
        name={'companyName'}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.companyName}
        size={'small'}
        testKey={'company-name-field'}
      />
    </>
  )
}
