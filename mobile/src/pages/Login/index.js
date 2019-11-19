import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TextInput, Text, TouchableOpacity, View, StyleSheet, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Login = (props) => {
	const [username, setUsername] = useState('')

	useEffect(() => {
		chkUserLoged();
	}, [username]);

	const chkUserLoged = async () => {
		const username = await AsyncStorage.getItem("@omnistack:username");
		if (username) {
			props.navigation.navigate('App')
		}
	}

	const handleLogin = async () => {
		if (!username.length) { return; }

		await AsyncStorage.setItem("@omnistack:username", username);
		props.navigation.navigate('Timeline')
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container} >
			<View style={styles.content}>
				<View>
					<FontAwesome name="twitter" size={64} color="#4BB0EE" />
				</View>
				<TextInput style={styles.input} placeholder="Nome do usuário" returnKeyType="send" value={username} onChangeText={(val) => setUsername(val)} onSubmitEditing={handleLogin}></TextInput>
				<TouchableOpacity onPress={handleLogin} style={styles.button}>
					<Text style={styles.buttonText}>Entrar</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF"
	},

	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 30
	},

	input: {
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 5,
		height: 44,
		paddingHorizontal: 15,
		alignSelf: "stretch",
		marginTop: 30
	},

	button: {
		height: 44,
		alignSelf: "stretch",
		marginTop: 10,
		backgroundColor: "#4BB0EE",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center"
	},

	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold"
	}
});

export default Login;