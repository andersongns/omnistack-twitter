import React from 'react';
import twitterLogo from '../../twitter.svg'
import Tweet from '../../components/Tweet'
import './index.css'
import api from '../../api'
import socket from 'socket.io-client'


export default class Timeline extends React.Component {
	state = {
		content: '',
		tweets: []
	}

	componentDidMount = () => {
		this.subscribreToEvent();
		this.fecthData();
	}

	handleInputKeyDown = (e) => {
		if (e.keyCode !== 13) { return; }
		this.handleSendTweet();
	}

	handleSendTweet = async () => {
		const { content } = this.state;
		const author = localStorage.getItem('@twitter:username');
		await api.post('tweets', { author, content });
		this.setState({ content: '' });
	}

	fecthData = async () => {
		const res = await api.get('tweets')
		this.setState({ tweets: res.data })
	}

	subscribreToEvent = async () => {
		const io = socket('http://127.0.0.1:8080');
		io.on('tweet', data => {
			const { tweets } = this.state;
			this.setState({ tweets: [data, ...tweets] });
		})
		io.on('like', data => {
			const { tweets } = this.state;
			this.setState({
				tweets: tweets.map(tweet =>
					tweet._id === data._id ? data : tweet
				)
			})
		})
	}

	render() {
		const { tweets, content } = this.state

		return (
			<div className="timeline-wrapper">
				<img height={24} src={twitterLogo} alt="twitter-logo" />
				<form>
					<textarea value={content} onChange={evt => this.setState({ content: evt.target.value })} onKeyDown={this.handleInputKeyDown} placeholder="O que está acontecendo?"></textarea>
				</form>
				<ul className="tweet-list">
					{tweets.map(tweet => <Tweet tweet={tweet} key={tweet._id} />)}
				</ul>
			</div>
		)
	}
}