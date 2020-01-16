import React from 'react';
import './Score.scss';

export type ScoreColor = 'red' | 'blue';

export interface IScore {
    color: ScoreColor;
    align?: 'right' | 'center' | 'left';
    amount: number;
}

const Score = (props: IScore) => {
    return (
        <div className={'score score--' + props.color} style={{ textAlign: props.align || 'left' }}>
            <span>Score</span>
            <span>{props.amount}</span>
        </div>
    );
};
export default Score;
