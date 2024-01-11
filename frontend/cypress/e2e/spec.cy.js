describe('testing home page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8000/api/cars', { statusCode: 200, body: [] });
        cy.visit('http://localhost:3000')
    })

    it('home page should load successfully', () => {
        cy.get('.first-container').should('exist')
        cy.get('.second-container').should('exist')
        cy.get('.third-container').should('exist')
        cy.get('.fourth-container').should('exist')
    })

    it('should fetch cars from the MongoDB API and display them', () => {
        cy.get('.second-container').should('exist')
        cy.get('.cars-display-container .car-display-container').should('have.length.greaterThan', 0)
    })

    it('should display the cookie modal after 3 seconds and close on "Sutinku" button click', () => {
        cy.get('.cookie-modal').should('not.have.class', 'show')
        cy.wait(3000);
        cy.get('.cookie-modal').should('have.class', 'show')

        cy.get('.cookie-modal button:contains("Sutinku")').click()
        cy.get('.cookie-modal').should('not.have.class', 'show')
    })

    it('should close the cookie modal when clicking "Nesutinku" button', () => {
        cy.visit('http://localhost:3000');
        cy.wait(3000);
        cy.get('.cookie-modal.show button').last().click();
        cy.get('.cookie-modal.show').should('not.exist');
      });

    it('should navigate to the login page when "Daugiau" button is clicked on a car', () => {
        cy.get('.second-container .car-display-container:first-child button').click()
        cy.url().should('include', '/login')
    })
})

describe('testing navbar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should toggle menu visibility when icon is clicked', () => {
        cy.get('.myLinks').should('not.be.visible')
        cy.get('.icon').click();
        cy.get('.myLinks').should('be.visible')
        cy.get('.icon').click();
        cy.get('.myLinks').should('not.be.visible')
    })

    it('should navigate to specified pages when menu links are clicked', () => {
        cy.get('.icon').click()
        cy.get('.myLinks').should('be.visible')

        cy.contains('.myLinks a', 'Apie mus').click({ force: true })
        cy.url().should('include', '/aboutus')

        cy.contains('.myLinks a', 'Privatumo politika').click({ force: true })
        cy.url().should('include', '/privacypolicy')

        cy.contains('.myLinks a', 'Nuomos sąlygos').click({ force: true })
        cy.url().should('include', '/rentpolicy')

        cy.contains('.myLinks a', 'DUK').click({ force: true })
        cy.url().should('include', '/faq')
    })

    it('should navigate to login page when "Prisijungti" button is clicked', () => {
        cy.contains('Prisijungti').click()
        cy.url().should('include', '/login')
    })

    it('should navigate to register page when "Registruotis" button is clicked', () => {
        cy.contains('Registruotis').click()
        cy.url().should('include', '/signup')
    })

})

describe('testing footer', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
  
    it('should navigate to specified pages whenlinks are clicked', () => {
        cy.contains('.first.link-list a', 'Apie mus').click()
        cy.url().should('include', '/aboutus')

        cy.contains('.first.link-list a', 'D.U.K').click()
        cy.url().should('include', '/faq')

        cy.contains('.second.link-list a', 'Privatumo sąlygos').click()
        cy.url().should('include', '/privacypolicy')

        cy.contains('.second.link-list a', 'Nuomos sąlygos').click()
        cy.url().should('include', '/rentpolicy')
    })
  
    it('should have social links with correct icons', () => {
        cy.get('.social-links a').should('have.length', 4)      
        cy.get('.social-links a i.bi-facebook').should('exist')
        cy.get('.social-links a i.bi-instagram').should('exist')
        cy.get('.social-links a i.bi-twitter-x').should('exist')
        cy.get('.social-links a i.bi-youtube').should('exist')
    })
  
    it('should display the correct year in copyright text', () => {
        const currentYear = new Date().getFullYear()
        cy.get('.footer-fixed .copyright-text').should('include.text', `Copyright ${currentYear}`)
    })

})

