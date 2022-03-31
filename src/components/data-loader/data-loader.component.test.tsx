import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as firebase from '../../firebase';
import DataLoader, { Category, Thought } from './data-loader.component';

const user = {
    email: 'example@gmail.com',
    uid: '123abc'
}

it('should render SkeletonScreen and not UserPage', () => {
    render(
        <MemoryRouter>
            <DataLoader user={user} />
        </MemoryRouter>
    );

    const skeletonScreen = screen.getByTestId('skeleton-screen');
    const userPage = screen.queryByTestId('user-page');

    expect(skeletonScreen).toBeInTheDocument();
    expect(userPage).not.toBeInTheDocument();
});

it('should render UserPage', async () => {
    const mockThoughts: Thought[] = [
        {
            id: '1',
            categories: [],
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

    const mockCategories: Category[] = [
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

    jest.spyOn(firebase, 'getDocuments').mockReturnValueOnce(Promise.resolve(mockThoughts)).mockReturnValueOnce(Promise.resolve(mockCategories));
    
    render(
        <MemoryRouter>
            <DataLoader user={user} />
        </MemoryRouter>
    );

    const userPage = await screen.findByTestId('user-page');

    expect(userPage).toBeInTheDocument();
});