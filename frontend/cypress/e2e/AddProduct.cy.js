describe('App', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })
  it('adds a new product', () => {
    cy.get('nav a').contains('Login').click()
    cy.get('input[type="email"]').type('test@mail.com')
    cy.get('input[type="password"]').type('1234')
    cy.get('button[type="submit"]').click()
    cy.get('nav a').contains('ADD PRODUCT').click()
    cy.get('#product-name').type('Test Product')
    cy.get('#product-price').type('20')
    cy.get('#product-info').type('Hello')
    cy.get('#product-location').type('Tampere')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', 'http://127.0.0.1:5173/')
    cy.get('nav a').contains('MY PRODUCTS').click()
    cy.contains('Test Product').should('exist')
  })
})