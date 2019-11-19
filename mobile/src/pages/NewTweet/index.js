import React, { useState } from 'react';
import { View, SafeAreaView, AsyncStorage, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../api'
const NewTweet = ({ navigation }) => {

	const [content, setContent] = useState('');

	const handleTweet = async () => {
		const author = await AsyncStorage.getItem('@omnistack:username"');
		await api.post('tweets', { author, content });
		navigation.pop();
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => { navigation.pop() }}>
					<MaterialIcons name="close" size={24} color="#4BB0EE"></MaterialIcons>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleTweet}>
					<Text style={styles.buttonText}>Tweetar</Text>
				</TouchableOpacity>
			</View>
			<TextInput style={styles.input} multiline placeholder="O que está acontecendo?" placeholderColor="#999" value={content} onChangeText={(value) => setContent(value)} returnKeyType="send" onSubmitEditing={handleTweet}></TextInput>
		</SafeAreaView>
	)

}

NewTweet.navigationOptions = () => ({
	title: 'Novo Tweet',
})

export default NewTweet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF"
	},

	header: {
		paddingTop: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},

	button: {
		height: 32,
		paddingHorizontal: 20,
		borderRadius: 16,
		backgroundColor: "#4BB0EE",
		justifyContent: "center",
		alignItems: "center"
	},

	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold"
	},

	input: {
		margin: 20,
		fontSize: 16,
		color: "#333"
	}
});