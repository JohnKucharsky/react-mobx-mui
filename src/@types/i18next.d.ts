import Resources from '@/@types/resources.d.ts'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources
  }
}
