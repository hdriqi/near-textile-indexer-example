const { Client, ThreadID, PrivateKey } = require('@textile/hub')

const keyInfo = {
	key: 'bmq6kfkrfjf27lymcfxgx74sgf4'
}
const threadID = 'bafk4e6cem4dy6eucaha2oirhdsoxrrshuzz6i4cxepa7dtxmwvzx6fa'

async function find() {
	const client = await Client.withKeyInfo(keyInfo)
	const identity = PrivateKey.fromRandom()
	await client.getToken(identity)
	const tID = ThreadID.fromString(threadID)
	const x = await client.find(tID, 'person', {})
	console.log(x)
	await client.create(tID, 'person', [{
		_id: '',
		bio: 'hello',
		name: 'world'
	}])
}

find()
