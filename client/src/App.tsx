import React, { useState } from 'react';
import './App.scss';
import logo from './logo.png';
import TileGrid from './components/TileGrid/TileGrid';
import { IGame } from './interfaces/game';

const App: React.FC = () => {
    const spiesTab = '1';
    const playersTab = '2';
    const [activeTab, setActiveTab] = useState(spiesTab);
    const [game, setGame] = useState({} as IGame);
    const ws = new WebSocket('ws://localhost:8080');

    let gameId = '';

    ws.onmessage = (ev: MessageEvent) => {
        const event = JSON.parse(ev.data);
        switch (event.type) {
            case 'game':
                const createdGame = event.payload as IGame;
                createdGame.tiles.forEach(t => (t.onWordClick = onWordClick));
                gameId = createdGame.id;
                setGame(createdGame);
                break;
        }
    };

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const createNewGame = () => {
        const data = {
            type: 'newgame',
        };
        ws.send(JSON.stringify(data));
    };

    const loadGame = () => {
        const gameId = window.prompt('Load a game?');
        const data = {
            type: 'loadgame',
            payload: {
                gameId,
            },
        };
        ws.send(JSON.stringify(data));
    };

    const onWordClick = (word: string) => {
        const data = {
            type: 'wordguessed',
            payload: {
                word,
                gameId,
            },
        };
        ws.send(JSON.stringify(data));
    };

    const renderTab = () => {
        if (!game.id) {
            return <span>Create new game</span>;
        }
        const viewAs = activeTab === spiesTab ? 'spies' : 'players';
        game.tiles.forEach(t => (t.viewAs = viewAs));
        return (
            <div style={{ width: '100%' }}>
                <TileGrid tiles={game.tiles} />
                <span className="game-id">{game.id}</span>
            </div>
        );
    };

    return (
        <div className="app">
            <button type="button" onClick={createNewGame}>
                NEW GAME
            </button>

            <button type="button" onClick={loadGame}>
                LOAD GAME
            </button>

            <img src={logo} alt="Codenames Logo" />

            <nav>
                <ul>
                    <button
                        className={
                            activeTab === spiesTab ? 'nav-item nav-item--active' : 'nav-item'
                        }
                        type="button"
                        onClick={() => toggle(spiesTab)}>
                        Spies
                    </button>

                    <button
                        className={
                            activeTab === playersTab ? 'nav-item nav-item--active' : 'nav-item'
                        }
                        type="button"
                        onClick={() => toggle(playersTab)}>
                        Players
                    </button>
                </ul>
            </nav>

            {renderTab()}
        </div>
    );
};

export default App;
