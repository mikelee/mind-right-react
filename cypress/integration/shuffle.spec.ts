import { deleteTestData, populateTestData, populateTestDataNoThoughts } from '../databaseSetUp';

afterEach(() => {
    cy.logout();
});

it('should click shuffle button and change the text with the new thoughts text', () => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    deleteTestData();
    populateTestData();

    cy.login(uid);
    cy.visit('http://localhost:3000/home');

    cy.get('[data-testid="random-thought-text"]').then(randomThoughtText => {
        const text = randomThoughtText.text();

        cy.get('button').click();

        cy.get('[data-testid="random-thought-text"]').should('not.have.text', text);
    });
});

it('should display message for no thoughts in database', () => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    deleteTestData();
    populateTestDataNoThoughts();

    cy.login(uid);
    cy.visit('http://localhost:3000/home');

    // no thoughts in the database
    cy.contains('Add some thoughts and get started!');
});

it('should display message for no thoughts with the selected category', () => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    deleteTestData();
    populateTestData();

    cy.login(uid);
    cy.visit('http://localhost:3000/home');

    // check first category
    cy.get('.menu-button').click();
    cy.get('.menu-item--categories').realHover();
    cy.get(':nth-child(1) > [data-testid="checkbox"]').realClick();
    cy.get('.menu-button').click();

    // no thoughts have the first category as a thoughtCategory
    cy.contains('No thoughts have the selected categories');
});