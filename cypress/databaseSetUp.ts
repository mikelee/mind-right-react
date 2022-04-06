import { Timestamp } from 'firebase/firestore';

const uid = 'PsRL0Nqd20fcPYDHrzsOV9yF9j62';

const categories = [
    {
        id: 'testCategoryId1',
        collection: 'categories',
        data: {
            name: 'Category One',
            selected: false,
            userId: uid
        }
    },
    {
        id: 'testCategoryId2',
        collection: 'categories',
        data: {
            name: 'Category Two',
            selected: true,
            userId: uid
        }
    },
    {
        id: 'testCategoryId3',
        collection: 'categories',
        data: {
            name: 'Category Three',
            selected: false,
            userId: uid
        }
    }
];

const thoughts = [
    {
        id: 'testThoughtId1',
        collection: 'thoughts',
        data: {
            categories: [],
            text: 'Thought One',
            image: '',
            timestamp: Timestamp.fromMillis(1649278600000),
            userId: uid
        }
    },
    {
        id: 'testThoughtId2',
        collection: 'thoughts',
        data: {
            categories: [],
            text: 'Thought Two',
            image: '',
            timestamp: Timestamp.fromMillis(1649278700000),
            userId: uid
        }
    },
    {
        id: 'testThoughtId3',
        collection: 'thoughts',
        data: {
            categories: [],
            text: 'Thought Three',
            image: '',
            timestamp: Timestamp.fromMillis(1649278800000),
            userId: uid
        }
    }
];

const databaseData = [
    ...categories,
    ...thoughts
];

export const populateTestData = () => {
    databaseData.forEach(data => {
        cy.callFirestore('set', `${data.collection}/${data.id}`, data.data);
    });    
}

export const deleteTestData = () => {
    // delete every category with test uid
    cy.callFirestore('delete', 'categories', { where: ['userId', '==', uid] });
    // delete every thought with test uid
    cy.callFirestore('delete', 'thoughts', { where: ['userId', '==', uid] });

}