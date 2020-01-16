import express from 'express';
import ws from 'ws';
import http from 'http';
import { GameService } from './services/game.service';

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });
const port = 8080;

const gameService = new GameService();

const sockets: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
    sockets.push(ws);
    ws.onmessage = (ev: MessageEvent) => {
        const event = JSON.parse(ev.data);

        switch (event.type) {
            case 'newgame':
                ws.send(
                    JSON.stringify({
                        type: 'game',
                        payload: gameService.createGame(),
                    }),
                );
                break;

            case 'wordguessed':
                sockets
                    .filter(s => s.readyState === s.OPEN)
                    .forEach(s => {
                        s.send(
                            JSON.stringify({
                                type: 'game',
                                payload: gameService.guessWord(
                                    event.payload.gameId,
                                    event.payload.word,
                                ),
                            }),
                        );
                    });
                break;

            case 'loadgame':
                ws.send(
                    JSON.stringify({
                        type: 'game',
                        payload: gameService.getGame(event.payload.gameId),
                    }),
                );
                break;
        }
    };
});

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
