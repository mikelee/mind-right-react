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
    const background1Ref = useRef<any>(null);
    const background2Ref = useRef<any>(null);

    const [thought1, setThought1] = useState<Thought | null>(null);
    const [thought2, setThought2] = useState<Thought | null>(null);
    const [currentThought, setCurrentThought] = useState<1 | 2>(1);
    const [text, setText] = useState('');

    useEffect(() => {
        if (thoughts) {
            if (!thoughts.length) {
                /*
                Reset thoughts and backgrounds for when the thoughts go from more than two to less than two thoughts.
                Therefore, not all of the data will be overwritten.
                Happens because categories are selected with no thoughts or thoughts are deleted.
                */
                background1Ref.current.style.opacity = '1';
                background2Ref.current.style.opacity = '0';
                background1Ref.current.style.backgroundImage = `url(${beachImage})`;
                background2Ref.current.style.backgroundImage = '';
                setThought1(null);
                setThought2(null);

                if (areUnselectedThoughts) {
                    setText('No thoughts have the selected categories.');
                } else {
                    setText('Add some thoughts and get started!');
                }
                return;
            } else if (thoughts.length === 1) {
                // reset both backgrounds and second thought
                background1Ref.current.style.opacity = '1';
                background2Ref.current.style.opacity = '0';
                background2Ref.current.style.backgroundImage = `url(${beachImage})`;
                setThought2(null);

                const currentThought = thoughts[0];
    
                setThought1(currentThought);
    
                currentThought.image
                ? background1Ref.current.style.backgroundImage = `url(${currentThought.image})`
                : background1Ref.current.style.backgroundImage = `url(${beachImage})`;
    
                setText(currentThought.text)
    
            } else {
                const foundThought1 = getDifferentThought(thoughts, []);
                const foundThought2 = getDifferentThought(thoughts, [foundThought1]);
    
                setThought1(foundThought1);
    
                foundThought1.image
                ? background1Ref.current.style.backgroundImage = `url(${foundThought1.image})`
                : background1Ref.current.style.backgroundImage = `url(${beachImage})`;
    
                setText(foundThought1.text)
                
                setThought2(foundThought2);
    
                foundThought2.image
                ? background2Ref.current.style.backgroundImage = `url(${foundThought2.image})`
                : background2Ref.current.style.backgroundImage = `url(${beachImage})`;
            }
        }
    }, [thoughts]);

    const getDifferentThought = (thoughts: Thought[], thoughtsToAvoid: Thought[]) => {
        let randomThought;

        if (thoughtsToAvoid.length) {
            const differentThoughts = thoughts.filter(thought => {
                let isDifferent = true;
    
                thoughtsToAvoid.forEach(thoughtToAvoid => {
                    if (thought.id === thoughtToAvoid.id) isDifferent = false;
                });
    
                return isDifferent;
            });
    
            const randomIndex = Math.floor((Math.random() * differentThoughts.length));
            randomThought = differentThoughts[randomIndex];
        } else {
            const randomIndex = Math.floor((Math.random() * thoughts.length));
            randomThought = thoughts[randomIndex];
        }

        return randomThought;
    }

    const shuffle = (thoughts: Thought[] | null, thought1: Thought | null, thought2: Thought | null) => {
        if (!thoughts || thoughts.length <= 1) {
            // do nothing
            return;
        } else if (thoughts.length === 2 && thought1 && thought2) {
            // swap thought1 and thought2
            swapThoughts(currentThought, thought1, thought2);
        } else {
            // swap thought1 and thought2, and replace previously used thought with a random new one to be ready for the next shuffle
            if (thought1 && thought2) {
                const nextThought = getDifferentThought(thoughts, [thought1, thought2]);
    
                swapThoughts(currentThought, thought1, thought2, nextThought);
            }
        }
    }

    const swapThoughts = (currentThought: 1 | 2, thought1: Thought, thought2: Thought, nextThought?: Thought) => {
        if (currentThought === 1) {
            background1Ref.current.style.opacity = '0';
            background2Ref.current.style.opacity = '1';

            setText(thought2.text);

            if (nextThought) {
                // delay replacing the previously used thought background with a new random one so that the switch isn't visible during the transition
                setTimeout(() => {
                    nextThought.image
                    ? background1Ref.current.style.backgroundImage = `url(${nextThought.image})`
                    : background1Ref.current.style.backgroundImage = `url(${beachImage})`;
                }, 500);

                setThought1(nextThought);
            }
            
            setCurrentThought(2);
        } else {
            background2Ref.current.style.opacity = '0';
            background1Ref.current.style.opacity = '1';
            
            setText(thought1.text);
            
            if (nextThought) {
                setTimeout(() => {
                    background2Ref.current.style.backgroundImage = `url(${nextThought.image})`;
                }, 500);

                setThought2(nextThought);
            }
            
            setCurrentThought(1);
        }
    }
    
    return (
        <main className='random-thought' ref={randomThoughtRef} >
            <div className='background background-1' ref={background1Ref}></div>
            <div className='background background-2' ref={background2Ref}></div>
            <p className='text' data-testid='random-thought-text'>{text}</p>
            <Button className='shuffle-button' text='Shuffle' onClick={() => shuffle(thoughts, thought1, thought2)} />
        </main>
    );
};

export default RandomThought;