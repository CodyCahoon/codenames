export function randomId(): string {
    return new Array(4)
        .fill(null)
        .map(() => Math.floor(Math.random() * 10))
        .join('');
}
