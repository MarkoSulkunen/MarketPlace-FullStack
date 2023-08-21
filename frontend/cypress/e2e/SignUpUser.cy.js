describe('App', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5173/')
    })
    it('navigates to the signup page', () => {
      cy.get('nav a').contains('SignUp').click()
      cy.url().should('include', 'http://127.0.0.1:5173/signup')
      cy.get('h2').contains('SignUp').should('exist')
    })
    it('signs up successfully', () => {
      cy.get('nav a').contains('SignUp').click()
      cy.get('#signup-name').type('test')
      cy.get('input[type="email"]').type('test@mail.com')
      cy.get('input[type="password"]').type('1234')
      cy.get('button[type="submit"]').click()
      cy.get('nav a').contains('PRODUCTS').should('exist')
      cy.get('nav a').contains('MY PRODUCTS').should('exist')
      cy.get('nav a').contains('ADD PRODUCT').should('exist')
      cy.get('nav a').contains('SignUp').should('not.exist')
    })
    });