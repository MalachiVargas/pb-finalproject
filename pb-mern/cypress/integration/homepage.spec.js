/// <reference types="cypress" />

context('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    });
    // unit testing
    it('should have Personal Budgets in the h1', () => {
        cy.get('h1').contains('Personal Budgets');
    });
    it('should have Login in the h1', () => {
        cy.visit('http://localhost:3001/login');
        cy.get('h1').contains('Login');
    });
    // applitools testing
    it('should look like the homepage', () => {
        cy.eyesOpen({
            appName: 'My App',
            testName: 'Homepage Check',
        });
        cy.eyesCheckWindow();
        cy.eyesClose();
    });
    it('should look like the login page', () => {
        cy.visit('http://localhost:3001/login');
        cy.eyesOpen({
            appName: 'My App',
            testName: 'Dashboard Check',
        });
        cy.eyesCheckWindow();
        cy.eyesClose();
    });
    // end to end testing
    it('should log in a user', () => {
        cy.get('#login').click();

        // Assert URL
        cy.url().should('include', 'login');
        cy.get('input[name=email]').type('yoshi@gmail.com');
        cy.get('input[name=password]').type('yoshi123');
        cy.get('button[type=submit]').click();

        // Assert welcome message
        cy.contains('Welcome to the Dashboard');
        cy.contains('Logout').click();
    });
});
