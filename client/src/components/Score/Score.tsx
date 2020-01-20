import React from 'react';
import './Score.scss';

export type ScoreColor = 'red' | 'blue';

export interface IScore {
    color: ScoreColor;
    align?: 'left' | 'center' | 'right';
    amount: number;
    total: number;
}

const Score = (props: IScore) => {
    return (
        <div className={'score score--' + props.color} style={{ textAlign: props.align || 'left' }}>
            <label className="score__title">Score</label>
            <span className="score__amount">{props.amount + '/' + props.total}</span>
        </div>
    );
};
export default Score;
