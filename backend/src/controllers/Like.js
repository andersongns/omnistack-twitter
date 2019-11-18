const Tweet = require('../models/Tweet')

module.exports = {
	async store(req, res) {
		try {
			const id = req.params.id;
			const tweet = await Tweet.findById(id)
			tweet.set({ likes: tweet.likes + 1 })
			await tweet.save()
			req.io.emit('like', tweet)
			return res.status(200).json(tweet)
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}