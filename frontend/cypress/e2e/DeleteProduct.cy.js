describe('App', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5173/product/1')
    })
    it('Delete the product', () => {
        cy.contains('Delete').click()
        cy.get('.modal__content').should('be.visible')
        cy.contains('Delete').click()
        cy.contains('Product deleted successfully').should('be.visible')
        cy.contains('New product name').should('not.exist')
    })
});