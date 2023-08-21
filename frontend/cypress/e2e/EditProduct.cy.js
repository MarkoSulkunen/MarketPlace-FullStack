describe('App', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5173/product/1')
    })
    it('edit the product', () => {
        cy.contains('Edit').click()
        cy.get('.modal__content').should('be.visible')
        cy.get('input[name="name"]').clear().type('New Product Name')
        cy.get('input[name="price"]').clear().type('500')
        cy.get('textarea[name="info"]').clear().type('New product information.')
        cy.get('input[name="image"]').clear().type('imagelink')
        cy.contains('Save').click()
        cy.contains('Product updated successfully').should('be.visible')
        cy.get('.product-item__info h2').should('contain', 'New Product Name')
        cy.get('.product-item__info p').should('contain', 'New product information.')
        cy.get('.product-item__info p').should('contain', '500')
        cy.get('.product-item__info img').should('have.attr', 'src', 'imagelink')
    })
});