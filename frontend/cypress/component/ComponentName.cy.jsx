
// import { mount } from 'cypress/react18'
// import Reservations from '../../src/pages/reservations/Reservations'

// Cypress.Commands.add('mount', (component, options) => {
//   // Wrap any parent components needed
//   // ie: return mount(<MyProvider>{component}</MyProvider>, options)
//   return mount(Reservations, options)
// })
// describe('ComponentName.cy.jsx', () => {
//   it('playground', () => {
//      cy.mount()
//   })
// })
import React from 'react';
import { mount } from 'cypress/react18';
import Reservations from '../../src/pages/reservations/Reservations';

Cypress.Commands.add('mountComponent', (component, options) => {
  // Wrap any parent components needed
  // e.g., return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(component, options);
});

describe('Reservations Page Test', () => {
  it('should render Reservations component', () => {
    cy.mountComponent(<Reservations />);
    
    // Add assertions to check if the component is rendered as expected
    cy.get('.reservations-container').should('exist'); // Replace with the actual selector

    // Add more assertions as needed
  });
});