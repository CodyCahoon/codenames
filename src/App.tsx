import React, { useState } from 'react';
import './App.scss';
import logo from './logo.png';
import { ITile } from './components/Tile/Tile';
import { getWords } from './utils/words';
import TileGrid from './components/TileGrid/TileGrid';
import { getColors } from './utils/colors';

const App: React.FC = () => {
    const spiesTab = '1';
    const playersTab = '2';
    const [activeTab, setActiveTab] = useState(spiesTab);
    const [colors] = useState(getColors());
    const [words] = useState(getWords());

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const renderTab = () => {
        const tiles: ITile[] = new Array(25).fill(null).map((t, i) => {
            return {
                color: colors[i],
                word: words[i],
                viewAs: activeTab === spiesTab ? 'spies' : 'players',
                isGuessed: false,
            };
        });

        return <TileGrid tiles={tiles} />;
    };

    return (
        <div className="app">
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
