# codenames - server

## Setup

### Prerequisites

| Library | Version | Install             | Check Version |
| ------- | ------- | ------------------- | ------------- |
| yarn    | 1.21.1  | `brew install yarn` | `yarn -v`     |
| node    | 13.5.0  | `brew install node` | `node -v`     |

### Running

```
yarn install; yarn start;
```

| Order | Command        | Purpose                                     |
| ----- | -------------- | ------------------------------------------- |
| 1     | `yarn install` | Installs dependencies for build/development |
| 2     | `yarn start`   | Starts express server at `localhost:8080`   |

### Tests

To run unit tests: `yarn test`
