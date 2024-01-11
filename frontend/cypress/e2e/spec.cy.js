/// <reference types="cypress" />



describe('RentPolicy Page', () => {
  it('should navigate back to the cars page when clicking the link', () => {
    // Visit the RentPolicy page
    cy.visit('http://localhost:3000/rentpolicy'); // Replace with the actual URL/path

    // Ensure that the RentPolicy component is rendered
    cy.get('.conditions.container.info-page').should('exist');

    // Click the Link to navigate back to the cars page
    cy.get('a').contains('Grįžti į pagrindinį').click();

    // After clicking the link, you may want to assert that you are back on the cars page
    // You might need to adapt the selector according to your actual project structure
    
  });
});


