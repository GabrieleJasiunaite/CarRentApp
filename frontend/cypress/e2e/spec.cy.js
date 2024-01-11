/// <reference types="cypress" />

describe('testuojeme Reservations.jsx', () => {
   
  it('succesfully login by appending username and passwor in URL',function () {
    cy.visit('http://localhost:3000/login/basic_auth')
    cy.get('p').should('include.text')
  })
})