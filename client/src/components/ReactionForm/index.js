import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = e => {
        if (e.target.value.length <= 280) {
            setBody(e.target.value);
            setCharacterCount(e.target.value.length);
        }
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        try {
            await addReaction({
                variables: { thoughtId, reactionBody }
            });

            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
        <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className='ml-2'>Something went wrong...</span>}
        </p>
        <form
            className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}
        >
            <textarea
            placeholder="Leave a reaction to this thought..."
            value={reactionBody}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            ></textarea>

            <button className="btn col-12 col-md-3" type="submit">
            Submit
            </button>
        </form>
        </div>
    );
};

export default ReactionForm;