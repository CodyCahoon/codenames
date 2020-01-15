import React from 'react';
import './Tile.scss';

export type TileColor = 'red' | 'blue' | 'white' | 'black';

export interface ITile {
    color: TileColor;
    isGuessed: boolean;
    viewAs: 'spies' | 'players';
    word: string;
}

const Tile = (props: ITile) => {
    const getClassName = (): string => {
        const guessTile = props.isGuessed ? 'tile--guessed' : 'tile--unguessed';
        return `tile tile--${props.viewAs} ${guessTile}--${props.color}`;
    };

    return (
        <div className={getClassName()}>
            <span>{props.word}</span>
        </div>
    );
};

export default Tile;
