import { fillData } from '../support/utils.ts'

describe('users', () => {
  it('users crud', () => {
    cy.visit('http://localhost:5173/')
    cy.getByDataId('name-cell')

    // add
    cy.getByDataId('add-button').click()
    cy.fixture('user').then(fillData)
    cy.getByDataId('create-button').click()
    cy.getByDataId('create-button').should('not.exist')
    cy.getByDataId('name-cell').should('contain.text', 'John')
    // add

    // edit
    cy.get('.MuiTableRow-root')
      .eq(1)
      .within(() => {
        cy.getByDataId('edit-pencil').first().click()
      })
    cy.getByDataId('name-field').clear()
    cy.getByDataId('name-field').type('Doe')
    cy.getByDataId('edit-button').click()
    cy.getByDataId('edit-button').should('not.exist')
    cy.getByDataId('name-cell').should('contain.text', 'Doe')
    // edit

    // remove
    let removeName: string = ''
    cy.get('.MuiTableRow-root')
      .eq(2)
      .within(() => {
        cy.getByDataId('name-cell')
          .invoke('text')
          .then((text) => {
            removeName = text.trim() // Save the name for later
            cy.getByDataId('row-checkbox').should('not.be.checked')
            cy.getByDataId('row-checkbox').click()
          })
      })

    cy.getByDataId('remove-button').click()
    cy.getByDataId('confirm-remove-button').click()

    cy.getByDataId('name-cell').should(($cells) => {
      const names = $cells.map((_, el) => Cypress.$(el).text().trim()).get()
      expect(names).not.to.include(removeName)
    })
    // remove
  })

  // detailed page
  it('detailed user page', () => {
    cy.visit('http://localhost:5173/')
    cy.getByDataId('link-button')

    let clickedName: string = ''
    cy.get('.MuiTableRow-root')
      .eq(1)
      .within(() => {
        cy.getByDataId('name-cell')
          .invoke('text')
          .then((text) => {
            clickedName = text.trim()
            cy.getByDataId('link-button').click()
          })
      })
    cy.getByDataId('name-title').should('contain.text', clickedName)
    cy.getByDataId('posts').first().click()
    cy.getByDataId('comments')
  })
  // detailed page
})
