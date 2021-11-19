import React from 'react';
import { Link } from 'react-router-dom';

import './thoughtsList.styles.scss';
import { Thought } from '../user-page/user-page.component';

import ThoughtItem from '../thought-item/thought-item.component';

interface Props {
    thoughts: Thought[] | null
}

const ThoughtsList: React.FC<Props> = ({ thoughts }) => (
    <div className='thoughts-list'>
        <Link to='/'>Back</Link>
        {
            thoughts?.map(thought => <ThoughtItem key={thought.id} {...thought} />)
        }
    </div>
);

export default ThoughtsList;