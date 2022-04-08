import { deleteTestData, populateTestData, thoughts } from '../databaseSetUp';

beforeEach(() => {
    const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

    deleteTestData();
    populateTestData();

    cy.login(uid);
    cy.visit('http://localhost:3000/home/thoughts');
});

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