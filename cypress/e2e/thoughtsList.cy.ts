import { deleteTestData, populateTestData, thoughts } from '../databaseSetUp';

beforeEach(() => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    deleteTestData();
    populateTestData();

    cy.login(uid);
    cy.visit('http://localhost:3000/home/thoughts');
});

afterEach(() => {
    cy.logout();
})

it('should display all thoughts in descending order by timestamp', () => {
    // sort thoughts by timestamp in descending order (newest first)
    const thoughtsArray = thoughts.map(thought => thought.data);
    const alphabeticalThoughts = thoughtsArray.sort((a, b) => {
        return b.timestamp.seconds - a.timestamp.seconds;
    });

    // loop through sorted thoughts. Add 2 to nth-child because the first thought is the second child
    for (let i = 0; i < alphabeticalThoughts.length; i++) {
        cy.get(`:nth-child(${i + 2}) > form > .text > .thought-item-input`).should('have.value', alphabeticalThoughts[i].text);
    }
});

it('should add a new thought at the top of thoughts list', () => {
    cy.contains('button', /add/i).realClick();

    cy.get(`:nth-child(${2}) > form > .text > .thought-item-input`).should('have.value', '');
    cy.get(`:nth-child(${2}) > form > .text > .thought-item-input`).type('New Thought');
    
    // to save text input since the save function is onBlur 
    cy.get('.thoughts-list').realClick();

    cy.get(`:nth-child(${2}) > form > .text > .thought-item-input`).should('have.value', 'New Thought');
});