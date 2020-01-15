import { TileColor } from '../components/Tile/Tile';

export function getColors(): TileColor[] {
    const colors: TileColor[] = [
        'black',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'white',
        'white',
        'white',
        'white',
        'white',
        'white',
        'white',
        Math.random() > 0.5 ? 'blue' : 'red',
    ];
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors;
}
