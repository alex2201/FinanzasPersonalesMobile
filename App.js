import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AccountScreen from "./components/screen/AccountScreen";
import {StatusBar} from "react-native";
import {StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import LoginForm from "./components/user/LoginForm";
import AppContext from "./AppContext";
import MainScreen from "./components/screen/MainScreen";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UserRegisterForm from "./components/user/UserRegisterForm";

const AuthStack = createStackNavigator(
    {
        UserLogin: LoginForm,
        UserRegister: UserRegisterForm,
    },
    {
        initialRouteName: 'UserLogin',
        headerMode: 'none',
    }
);
const AppStack = createStackNavigator(
    {
        Account: {screen: AccountScreen},
    },
    {
        initialRouteName: 'Account',
        headerMode: 'none',
    }
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Main: MainScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Main',
            headerMode: 'none',
        }
    ));

class App extends React.Component<{}> {
    state = {
        jwt: '',
        username: '',
        movementTypes: [],
        logged: false,
        loaded: false,
        handleUserLogging: (user) => this.handleUserLogging(user),
        handleAppDataLoaded: (appData) => this.handleAppDataLoaded(appData),
        handleUserLogout: () => this.handleUserLogout()
    };

    handleAppDataLoaded(appData: any) {
        const movementTypes = appData.movementTypes;
        this.setState({
            ...this.state,
            movementTypes: movementTypes,
            loaded: true,
        });
    }

    handleUserLogging(username: string, jwt: string, refresh_jwt: string) {
        this.setState({
            ...this.state,
            username: username,
            jwt: jwt,
            refresh_jwt: refresh_jwt,
            logged: true,
        })
    }

    handleUserLogout() {
        this.setState({
            ...this.state,
            username: '',
            jwt: '',
            refresh_jwt: '',
            logged: false,
        })
    }

    constructor(props) {
        super(props);
        StatusBar.setHidden(true);
    }

    render() {
        return (
            <SafeAreaProvider>
                <StyleProvider style={getTheme(material)}>
                    <AppContext.Provider value={this.state}>
                        <AppContainer>
                        </AppContainer>
                    </AppContext.Provider>
                </StyleProvider>
            </SafeAreaProvider>
        );
    }
}

export default App;
