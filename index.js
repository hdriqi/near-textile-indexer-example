const dotenv = require('dotenv')
const indexer = require('near-textile-indexer')
const { Where } = require('near-textile-indexer/textile')

dotenv.config()

const writeValidator = (writer) => {
	// only allow admin public key to write new data to thread
	if (writer == 'bbaareigzrypntrkuzr54rg2q235qqqpmhtda3jwelvmxbutnupifumy26i') {
		return true
	}
	return false
}

const config = {
	networkId: process.env.NETWORK_ID,
	nodeUrl: process.env.NODE_URL,
	contractName: process.env.CONTRACT_NAME,
	keyInfo: {
		key: process.env.TEXTILE_API_KEY
	},
	privateKey: process.env.ADMIN_PRIVATE_KEY,
	// collections config setting
	collections: [
		{
			name: 'person',
			schema: {
				title: 'Person',
				type: 'object',
				properties: {
					_id: { type: 'string' },
					name: { type: 'string' },
					bio: { type: 'string' },
				},
			},
			writeValidator
		},
	],
	// callback called when new event found
	async processEvent(ctx, event, textileClient) {
		console.log(`${event.collection}::${event.action}`)
		if (event.collection === 'person') {
			if (event.action === 'create') {
				const newPerson = {
					_id: '',
					name: event.params[0],
					bio: event.params[1],
				}
				await textileClient.create(ctx.threadID, event.collection, [newPerson])
			}
			if (event.action === 'update') {
				const query = new Where('name').eq(event.params[0])
				const result = await textileClient.find(
					ctx.threadID,
					event.collection,
					query
				)

				if (result.length > 0) {
					const person = result[0]
					person.bio = event.params[1]

					await textileClient.save(ctx.threadID, event.collection, [person])
				}
			}
			if (event.action === 'delete') {
				const query = new Where('name').eq(event.params[0])
				const result = await textileClient.find(
					ctx.threadID,
					event.collection,
					query
				)

				if (result.length > 0) {
					const ids = await result.map((instance) => instance._id)
					await textileClient.delete(ctx.threadID, event.collection, ids)
				}
			}
		}
	},
}

// start indexer based on config
indexer(config)
