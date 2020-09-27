# near-textile-indexer-example

This repo is example on how to use [near-textile-indexer](https://github.com/hdriqi/near-textile-indexer)

This example is using AssemblyScript-based smart contract. The indexer is also available for Rust-based smart contract as long it is satisfy the required `methods` and the `Event type`

## How to

1. Clone this repo
```bash
git clone https://github.com/hdriqi/near-textile-indexer-example
```

2. Install dependency
```bash
yarn install or npm install
``` 

## AssemblyScript

You need to deploy the smart contract to NEAR blockchain.

```bash
yarn deploy:dev
```

or you can just use the already deployed contract on testnet at [dev-1601093501138-5843386](https://explorer.testnet.near.org/accounts/dev-1601093501138-5843386)

## Generate Account

You need to provide a master account that can write to the database.

```bash
node gen-account.js
```

Copy the publicKey and put it in in writeValidator function in `index.js`. 
Copy the privateKey and put it in to `env` variables for indexer authentication.

## Run Indexer

Before running the indexer, make sure you create the `.env` based on the sample provided.

When everything is ready, you can run the indexer by using:

```bash
node index.js
```

## Query

After indexing, you can query the data using the example query provided on `example-query.js`

```bash
node example-query.js
```