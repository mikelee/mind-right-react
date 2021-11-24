import React from 'react';
import { Link } from 'react-router-dom';

import './thoughtsList.styles.scss';
import { Thought } from '../user-page/user-page.component';
import { User } from '../../App';

import ThoughtItem from '../thought-item/thought-item.component';

interface Props {
    thoughts: Thought[] | null,
    user: User
}

const ThoughtsList: React.FC<Props> = ({ thoughts, user }) => (
    <div className='thoughts-list'>
        <Link to='/'>Back</Link>
        {
            thoughts?.map(thought => <ThoughtItem key={thought.id} {...thought} user={user} />)
        }
    </div>
);

export default ThoughtsList;