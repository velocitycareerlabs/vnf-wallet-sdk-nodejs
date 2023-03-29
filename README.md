## VNF Wallet SDK NodeJs

This is a simple, opinionated monorepo for the SDK

## Built With

- Strict [Typescript}(http://typescript.io) support
- Testing via [Jest](https://jestjs.io/)
- Monorepo using [Lerna](https://lerna.js.org)
- Linting via [eslint](https://eslint.org/)
- Watch files and restart server via [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- Code formatting via [Prettier](https://prettier.io/)

### Sample Server Built With
- Reading API in a directory via [fastify-autoload](https://github.com/fastify/fastify-autoload)
- Auto generated types from JSON schema with [json-schema-to-ts](https://www.npmjs.com/package/json-schema-to-ts)
- Pretty logs during development via [pino-pretty](https://github.com/pinojs/pino-pretty)

### SDK built with
- Module building using [Rollup](https://rollupjs.org)

## Testing

All packages
```
> yarn lerna run test
```

One package
```
> cd packages/sdk // replace with your chosen package
> yarn test
```

## Building

All packages
```
> yarn lerna run build
```

One package
```
> cd packages/sdk // replace with your chosen package
> yarn build
```
