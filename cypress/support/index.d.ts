declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select an element by data-id attribute.
     * @example cy.getByDataId('submit-button')
     */
    getByDataId(dataId: string): Chainable<JQuery<HTMLElement>>
  }
}
