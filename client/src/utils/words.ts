import allWords from './words.json';

export function getWords(): string[] {
    const words = new Set();
    while (words.size !== 25) {
        const index = Math.floor(Math.random() * allWords.length);
        words.add(allWords[index]);
    }
    return Array.from(words) as string[];
}
