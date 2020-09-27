const { PrivateKey } = require('@textile/hub')

async function genAccount() {
	const identity = PrivateKey.fromRandom()
	console.log({
    publicKey: identity.public.toString(),
    privateKey: identity.toString()
  })
}

genAccount()
