import React, { useEffect, useRef, useState } from 'react';
import { Thought } from '../user-page/user-page.component';

import './random-thought.styles.scss';

import Button from '../button/button.component';

interface Props {
    thoughts: Thought[] | null,
    user: any
}

const RandomThought: React.FC<Props> = ({ thoughts, user }) => {

    const randomThoughtRef = useRef<any>(null);

    const [text, setText] = useState('');
    const [thoughtId, setThoughtId] = useState('');

    useEffect(() => {
        shuffleThought(thoughts);

    }, [thoughts]);

    const shuffleThought: any = async (thoughts: Thought[] | null) => {
        if (thoughts && thoughts.length > 0) {
            const randomIndex = Math.floor((Math.random() * thoughts.length));

            const thought = thoughts[randomIndex];

            if (thought.id === thoughtId && thoughts.length > 1) return shuffleThought(thoughts);

            setText(thought.text);
            setThoughtId(thought.id);

            randomThoughtRef.current.style.backgroundImage = `url(${thought.image})`;
        } else {
            setText('Add some thoughts and get started!');
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