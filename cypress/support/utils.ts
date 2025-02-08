export const fillData = (data: { 'data-id': string; value: string }[]) => {
  for (const item of data) {
    cy.getByDataId(item['data-id']).type(item.value)
  }
}
