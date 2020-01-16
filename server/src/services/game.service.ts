import { randomId } from '../utils/id';
import { getColors } from '../utils/colors';
import { getWords } from '../utils/words';

export class GameService {
    private games = new Map<string, Game>();

    public createGame(): Game {
        const id = randomId();
        const colors = getColors();
        const words = getWords();
        const tiles = colors.map((c, i) => {
            return {
                color: c,
                isGuessed: false,
                word: words[i],
            };
        });
        const newGame = { id, tiles };
        this.games.set(id, newGame);
        return newGame;
    }

    public getGame(gameId: string): Game {
        return this.games.get(gameId);
    }

    public guessWord(gameId: string, word: string): Game {
        const game = this.getGame(gameId);
        const tile = game.tiles.find(t => t.word === word);
        tile.isGuessed = true;
        this.games.set(gameId, game);
        return game;
    }
}

export interface Game {
    id: string;
    tiles: Tile[];
}

export type TileColor = 'red' | 'blue' | 'black' | 'white';
export interface Tile {
    color: TileColor;
    isGuessed: boolean;
    word: string;
}
