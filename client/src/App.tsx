import React, { useState } from 'react';
import './App.scss';
import logo from './logo.png';
import TileGrid from './components/TileGrid/TileGrid';
import { IGame } from './interfaces/game';
import Score from './components/Score/Score';
import Timer from './components/Timer/Timer';

const App: React.FC = () => {
    const spiesTab = '1';
    const playersTab = '2';
    const [activeTab, setActiveTab] = useState(spiesTab);
    const [game, setGame] = useState({} as IGame);
    const [timer, setTimer] = useState(false);

    const webSocket = new WebSocket('ws://localhost:8080');

    let gameId = '';

    webSocket.onmessage = (ev: MessageEvent) => {
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
        webSocket.send(JSON.stringify(data));
    };

    const loadGame = () => {
        const gameId = window.prompt('Enter the game id:');
        const data = {
            type: 'loadgame',
            payload: {
                gameId,
            },
        };
        webSocket.send(JSON.stringify(data));
    };

    const onWordClick = (word: string) => {
        const data = {
            type: 'wordguessed',
            payload: {
                word,
                gameId,
            },
        };
        webSocket.send(JSON.stringify(data));
    };

    const startTimer = () => {
        setTimer(true);
    };

    const stopTimer = () => {
        setTimer(false);
    };

    const renderTab = () => {
        if (!game.id) {
            return null;
        }
        const viewAs = activeTab === spiesTab ? 'spies' : 'players';
        game.tiles.forEach(t => (t.viewAs = viewAs));
        return (
            <div style={{ width: '100%' }}>
                <TileGrid tiles={game.tiles} />
                <span className="game-id">{game.id}</span>
                <div className="scores">
                    <Score
                        color="red"
                        align="left"
                        amount={game.tiles.filter(t => t.color === 'red' && t.isGuessed).length}
                    />
                    <Score
                        color="blue"
                        align="right"
                        amount={game.tiles.filter(t => t.color === 'blue' && t.isGuessed).length}
                    />
                </div>
            </div>
        );
    };

    const renderTimer = () => {
        if (!timer) {
            return (
                <div className="timers">
                    <button className="timer" type="button" onClick={startTimer}>
                        Start Timer
                    </button>
                </div>
            );
        }

        return (
            <div className="timers">
                <button className="timer" type="button" onClick={stopTimer}>
                    Stop Timer
                </button>
                <Timer />
            </div>
        );
    };

    return (
        <div className="app">
            {renderTimer()}

            <div className="buttons">
                <button type="button" onClick={createNewGame}>
                    New Game
                </button>

                <button type="button" onClick={loadGame}>
                    Load Game
                </button>
            </div>

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
