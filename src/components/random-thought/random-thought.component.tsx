import React, { useEffect, useRef, useState } from 'react';
import { Thought } from '../user-page/user-page.component';

import './random-thought.styles.scss';

import Button from '../button/button.component';
import beachImage from '../../assets/beach-image.jpeg';

interface Props {
    thoughts: Thought[] | null
}

const RandomThought: React.FC<Props> = ({ thoughts }) => {

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
        } else {
            setText('Add some thoughts and get started!');
            randomThoughtRef.current.style.backgroundImage = `url(${beachImage})`;
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