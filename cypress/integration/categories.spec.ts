import { deleteTestData, populateTestData } from '../databaseSetUp';

beforeEach(() => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    deleteTestData();
    populateTestData();

    cy.login(uid);
    cy.visit('http://localhost:3000/home');
});


it('should check first category', () => {
    cy.get('.menu-button').click();

    cy.get('.menu-item--categories').realHover();
    
    cy.get(':nth-child(1) > [data-testid="checkbox"]').should('not.have.class', 'checked');
    cy.get(':nth-child(1) > [data-testid="checkbox"]').realClick();
    cy.get(':nth-child(1) > [data-testid="checkbox"]').should('have.class', 'checked');
});