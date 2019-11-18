const Tweet = require('../models/Tweet')

module.exports = {
	async index(req, res) {
		try {
			const tweets = await Tweet.find({}).sort('-createdAt')
			return res.status(200).json(tweets)
		} catch (err) {
			return res.status(400).json(err)
		}
	},
	async store(req, res) {
		try {
			const { author, content } = req.body
			const tweet = await Tweet.create({ author, content })
			req.io.emit('tweet', tweet)
			return res.status(200).json(tweet)
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}