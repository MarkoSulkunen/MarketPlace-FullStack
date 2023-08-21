describe('App', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })
  it('navigates to the login page', () => {
    cy.get('nav a').contains('Login').click()
    cy.url().should('include', 'http://127.0.0.1:5173/login')
    cy.get('h2').contains('Login').should('exist')
  })
  it('logs in successfully', () => {
    cy.get('nav a').contains('Login').click()
    cy.get('input[type="email"]').type('test@mail.com')
    cy.get('input[type="password"]').type('1234')
    cy.get('button[type="submit"]').click()
    cy.get('nav a').contains('PRODUCTS').should('exist')
    cy.get('nav a').contains('MY PRODUCTS').should('exist')
    cy.get('nav a').contains('ADD PRODUCT').should('exist')
    cy.get('nav a').contains('Login').should('not.exist')
  })
  });