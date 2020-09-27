const dotenv = require('dotenv')
const { Client, ThreadID, PrivateKey } = require('@textile/hub')

dotenv.config()

const keyInfo = {
	key: process.env.PUBLIC_TEXTILE_API_KEY,
}
const threadID = 'bafk4e6cem4dy6eucaha2oirhdsoxrrshuzz6i4cxepa7dtxmwvzx6fa'

async function find() {
	const client = await Client.withKeyInfo(keyInfo)
	const identity = PrivateKey.fromRandom()
	await client.getToken(identity)
	const tID = ThreadID.fromString(threadID)
	const personList = await client.find(tID, 'person', {})
	console.log(personList)
}

find()
