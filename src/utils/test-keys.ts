export const TestKeys = {
  'add-button': 'add-button',
  'create-button': 'create-button',
  'edit-button': 'edit-button',
  'remove-button': 'remove-button',
  'confirm-remove-button': 'confirm-remove-button',
  'row-checkbox': 'row-checkbox',
  'edit-pencil': 'edit-pencil',
  'name-cell': 'name-cell',
  'link-button': 'link-button',
  // fields
  'name-field': 'name-field',
  'username-field': 'username-field',
  'email-field': 'email-field',
  'phone-field': 'phone-field',
  'website-field': 'website-field',
  'street-field': 'street-field',
  'suite-field': 'suite-field',
  'city-field': 'city-field',
  'zipcode-field': 'zipcode-field',
  'company-name-field': 'company-name-field',
  // details page
  'name-title': 'name-title',
  posts: 'posts',
  comments: 'comments',
} as const

export type TestKeysType = keyof typeof TestKeys

export const addTestKey = (testKey?: TestKeysType) =>
  testKey
    ? {
        'data-cy': testKey,
      }
    : {}
