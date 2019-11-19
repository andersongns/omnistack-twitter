import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Tweet from '../../components/Tweet'
import api from '../../api'
import socket from 'socket.io-client'

export default class Timeline extends React.Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Timeline',
		headerRight: () => (
			<TouchableOpacity onPress={() => {
				navigation.navigate('NewTweet')
			}}>
				<MaterialIcons style={styles.headerRightButton} name="add-circle-outline" size={24}>

				</MaterialIcons>
			</TouchableOpacity>
		),
	})

	state = {
		tweets: []
	}

	componentDidMount = () => {
		this.subscribreToEvent();
		this.fecthData();
	}

	fecthData = async () => {
		const res = await api.get('tweets')
		this.setState({ tweets: res.data })
	}

	subscribreToEvent = async () => {
		const io = socket('http://192.168.11.7:8080');
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

		const { tweets } = this.state;

		return (
			<View style={styles.container}>
				<FlatList data={tweets} keyExtractor={tweet => tweet._id} renderItem={({ item }) => <Tweet tweet={item} />} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF"
	},
	headerRightButton: {
		marginRight: 20,
		color: '#4BB0EE'
	}
});