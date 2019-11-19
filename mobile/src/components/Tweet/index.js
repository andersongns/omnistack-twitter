import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import api from '../../api'

const Tweet = (props) => {
	const { tweet } = props;
	const handleLike = async () => {
		await api.post(`likes/${tweet._id}`)
	}
	return (
		<View style={styles.container}>
			<Text style={styles.author}>{tweet.author}</Text>
			<Text style={styles.content}>{tweet.content}</Text>
			<TouchableOpacity onPress={handleLike} style={styles.likeButton}>
				<Ionicons name="ios-heart-empty" size={20} color="#999"></Ionicons>
				<Text style={styles.likeText}>{tweet.likes}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Tweet;
const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderBottomWidth: 1,
		borderColor: "#eee"
	},

	author: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#1C2022"
	},

	content: {
		fontSize: 15,
		lineHeight: 20,
		color: "#1C2022",
		marginVertical: 10
	},

	likeButton: {
		flexDirection: "row",
		alignItems: "center"
	},

	likeText: {
		color: "#999",
		marginLeft: 5
	}
});