import React, { useEffect, useRef, useState } from 'react';
import { Thought } from '../user-page/user-page.component';

import './randomThought.styles.scss';

import Button from '../button/button.component';

interface Props {
    thoughts: Thought[] | null,
    user: any
}

const RandomThought: React.FC<Props> = ({ thoughts, user }) => {

    const randomThoughtRef = useRef<any>(null);

    const [text, setText] = useState('');

    useEffect(() => {
        shuffleThought(thoughts);

    }, [thoughts]);

    const shuffleThought = async (thoughts: Thought[] | null) => {
        if (thoughts) {
            const randomIndex = Math.floor((Math.random() * thoughts.length));

            const thought = thoughts[randomIndex];

            setText(thought.text);

            randomThoughtRef.current.style.backgroundImage = `url(${thought.image})`;
        }
    }
    
    return (
        <div className='random-thought' ref={randomThoughtRef} >
            <p className='text'>{text}</p>
            <Button className='shuffle-button' text='Shuffle' onClick={() => shuffleThought(thoughts)} />
        </div>
    );
};

export default RandomThought;