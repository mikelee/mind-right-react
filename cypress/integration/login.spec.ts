it('should log in user, display skeleton screen, and then display shuffle button', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.visit('http://localhost:3000/');

    cy.contains(/sign in/i).click();

    cy.get('[name="email"]')
        .type(username)
        .should('have.value', username);

    cy.get('[name="password"]')
        .type(password, {log: false})
        .should('have.value', password);

    cy.get('form > .button').click();

    cy.get('[data-testid="skeleton-screen"]').should('be.visible');

    cy.contains(/shuffle/i);

    cy.logout();
});

it('should log out user', () => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    cy.login(uid);
    cy.visit('http://localhost:3000/home');

    cy.get('.menu-button').click();
    cy.contains(/log out/i).click();

    cy.contains(/mindright/i);
});