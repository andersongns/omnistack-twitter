import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Login from './pages/Login'
import Timeline from './pages/Timeline'
import NewTweet from './pages/NewTweet'


const Routes = createAppContainer(
	createSwitchNavigator({
		Login,
		App: createStackNavigator({
			Timeline,
			NewTweet
		})
	})
);

export default Routes;