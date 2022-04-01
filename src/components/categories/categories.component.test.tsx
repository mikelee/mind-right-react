import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Categories from './categories.component';
import { Category, Thought } from '../data-loader/data-loader.component';

const categories: Category[] = [
    {
        id: '1',
        name: 'Category One',
        selected: true
    },
    {
        id: '2',
        name: 'Category Two',
        selected: false
    },
    {
        id: '3',
        name: 'Category Three',
        selected: true
    }
];

const thoughts: Thought[] = [
    {
        id: '1',
        categories: [
            {
                id: '2',
                name:'Category Two'
            }
        ],
        text: 'Thought One',
        image: ''
    },
    {
        id: '2',
        categories: [],
        text: 'Thought Two',
        image: ''
    },
    {
        id: '3',
        categories: [],
        text: 'Thought Three',
        image: ''
    }
];

const user = {
    email: 'example@gmail.com',
    uid: '123abc'
}

beforeEach(() => {
    render(<Categories
        categories={categories}
        thoughts={thoughts}
        user={user}
        getCategories={jest.fn()}
        getUserData={jest.fn()}
    />);
  });

it('should render a list of categories', () => {
    const categoryOne = screen.queryByText(categories[0].name);
    const categoryTwo = screen.queryByText(categories[1].name);
    const categoryThree = screen.queryByText(categories[2].name);

    expect(categoryOne).toBeInTheDocument();
    expect(categoryTwo).toBeInTheDocument();
    expect(categoryThree).toBeInTheDocument();
});

it('should render "Add" button and not "Save" button', () => {
    const addButton = screen.queryByText('Add');
    const saveButton = screen.queryByText('Save');

    expect(addButton).toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
});

it('should display delete button to delete "Category Two"', async () => {
    const categoryTwo = screen.getByText(categories[1].name);

    expect(categoryTwo).toBeInTheDocument();

    await waitFor(() => userEvent.dblClick(categoryTwo));

    const confirmDeleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(confirmDeleteButton).toBeInTheDocument();
});

it('should display "Save" button', () => {
    const editTab = screen.getByText('Edit');
    let saveButton = screen.queryByRole('button', {
        name: 'Edit'
    });

    expect(saveButton).not.toBeInTheDocument();
    
    userEvent.click(editTab);

    saveButton = screen.queryByRole('button');

    expect(saveButton).toBeInTheDocument();
});