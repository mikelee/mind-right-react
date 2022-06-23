import React, { useEffect, useRef, useState } from 'react';

import './random-thought.styles.scss';

import { Thought } from '../../components/data-loader/data-loader.component';

import Button from '../../components/button/button.component';
import beachImage from '../../assets/beach-image.jpeg';

interface Props {
    thoughts: Thought[] | null,
    areUnselectedThoughts: boolean
}

const RandomThought: React.FC<Props> = ({ thoughts, areUnselectedThoughts }) => {

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

            if (thought.image !== '') {
                randomThoughtRef.current.style.backgroundImage = `url(${thought.image})`;
            } else {
                randomThoughtRef.current.style.backgroundImage = `url(${beachImage})`;
            }
        } else if (areUnselectedThoughts) {
            setText('No thoughts have the selected categories');
            randomThoughtRef.current.style.backgroundImage = `url(${beachImage})`;
        } else {
            setText('Add some thoughts and get started!');
            randomThoughtRef.current.style.backgroundImage = `url(${beachImage})`;
        }
    }
    
    return (
        <main className='random-thought' ref={randomThoughtRef} >
            <p className='text' data-testid='random-thought-text'>{text}</p>
            <Button className='shuffle-button' text='Shuffle' onClick={() => shuffleThought(thoughts)} />
        </main>
    );
};

export default RandomThought;