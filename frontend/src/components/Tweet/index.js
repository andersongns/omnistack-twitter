import React from 'react';
import like from '../../like.svg'
import './index.css'
import api from '../../api'
const Tweet = (props) => {
	const { tweet } = props;

	const handleLike = async () => {
		await api.post(`likes/${tweet._id}`)
	}

	return (
		<li className="tweet" id={tweet._id}>
			<strong>{tweet.author}</strong>
			<p>{tweet.content}</p>
			<button type="button" onClick={handleLike}><img src={like} alt="like-logo" /> {tweet.likes}</button>
		</li>
	)
}

export default Tweet