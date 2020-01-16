import React from 'react';
import './TileGrid.scss';
import '../Tile/Tile';
import Tile, { ITile } from '../Tile/Tile';

export interface ITileGrid {
    tiles: ITile[];
}

const TileGrid = (props: ITileGrid) => {
    const { tiles } = props;
    if (!tiles || tiles.length !== 25) {
        return null;
    }

    const tileRows = [
        tiles.slice(0, 5),
        tiles.slice(5, 10),
        tiles.slice(10, 15),
        tiles.slice(15, 20),
        tiles.slice(20, 25),
    ];

    return (
        <div className="tiles">
            {tileRows.map(tr => {
                return (
                    <div className="tiles__row">
                        {tr.map(t => (
                            <Tile word={t.word} viewAs={t.viewAs} color={t.color} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default TileGrid;
