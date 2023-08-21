describe('App', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('renders the navigation menu', () => {
    cy.get('nav').should('exist')
    cy.get('nav a').contains('MY PRODUCTS').should('not.exist')
    cy.get('nav a').contains('ADD PRODUCT').should('not.exist')
    cy.get('nav a').contains('Login').should('exist')
  })
})