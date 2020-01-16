import React, { useState } from 'react';
import './Tile.scss';

export type TileColor = 'red' | 'blue' | 'white' | 'black';

export interface ITile {
    color: TileColor;
    viewAs: 'spies' | 'players';
    word: string;
}

const Tile = (props: ITile) => {
    const [isGuessed, setGuessed] = useState(false);

    const getClassName = (): string => {
        const guessTile = isGuessed ? 'tile--guessed' : 'tile--unguessed';
        return `tile tile--${props.viewAs} ${guessTile}--${props.color}`;
    };

    return (
        <div className={getClassName()} role="button" onClick={() => setGuessed(true)}>
            <span>{props.word}</span>
        </div>
    );
};

export default Tile;
