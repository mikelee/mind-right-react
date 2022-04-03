beforeEach(() => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';
    cy.login(uid);
    cy.visit('http://localhost:3000/home');
});

afterEach(() => {
    cy.logout();
});

it('should click shuffle button and change the text with the new thoughts text', () => {
    cy.get('[data-testid="random-thought-text"]').then(randomThoughtText => {
        const text = randomThoughtText.text();

        cy.get('button').click();

        cy.get('[data-testid="random-thought-text"]').should('not.have.text', text);
    });
});