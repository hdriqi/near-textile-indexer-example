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

# Env Setup

Create `env` based on the `env.sample`.

Here's the basic setup for NEAR testnet
```
NETWORK_ID=default
NODE_URL=https://rpc.testnet.near.org
```

## Contract

You need to deploy the smart contract to NEAR blockchain.

```bash
yarn deploy:dev
```

or use the already deployed contract on testnet at [dev-1601093501138-5843386](https://explorer.testnet.near.org/accounts/dev-1601093501138-5843386)

update the `env`

```
CONTRACT_NAME=dev-1601093501138-5843386
```

## Generate Textile API Key

You need to generate `user group` API key from Textile and put it in `env`

[Read from Textile docs](https://docs.textile.io/hub/apis/)

OPTIONAL:

You also can generate another `user group` API key from Textile to be a client-side API & public use.
Make sure both of them are on the same org.

```
TEXTILE_API_KEY=xxx(required)
PUBLIC_TEXTILE_API_KEY=xxx(optional)
```

## Generate Account

You need to provide a master account that can write to the database.

```bash
node gen-account.js
```

Copy the privateKey and put it in to `env` variables for indexer authentication.

```
ADMIN_PRIVATE_KEY=xxx(required)
```

Copy the publicKey and put it in in writeValidator function in `index.js`. 

```js
const writeValidator = (writer) => {
	// only allow admin public key to write new data to thread
	if (writer == 'UPDATE_PUBLIC_KEY') {
		return true
	}
	return false
}
```

Notes: `writeValidator` only does not support external variable, so you can only update the pubKey via string.

## Run Indexer

When everything is ready, you can run the indexer by using:

```bash
node index.js
```

## Query

After indexing, you can query the data using the example query provided on `example-query.js`

```bash
node example-query.js
```