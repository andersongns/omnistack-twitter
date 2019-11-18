import React, { useState } from 'react';
import twitterLogo from '../../twitter.svg'
import './index.css'


export default function Login(props) {
	const [username, setUsername] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!username.length) {
			return;
		}
		localStorage.setItem('@twitter:username', username);

		props.history.push('/timeline')
	}

	return (
		< div className="login-wrapper" >
			<img src={twitterLogo} alt="Twitter Logo" />
			<form onSubmit={handleSubmit}>
				<input placeholder="Informe o nome do usuário" value={username} onChange={event => setUsername(event.target.value)} />
				<button type="submit">Entrar</button>
			</form>
		</div >
	)

}