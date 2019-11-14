import React, {Component} from 'react';
import {Spinner, Text, View} from "native-base";
import {ImageBackground, StyleSheet} from "react-native";
import AppContext from "../../AppContext";
import urls from "../../url";
import {LocalDataManagement} from "../../LocalDataManagement";
import {GraphQl} from "../../GraphQl";

const bgImg = require('../../res/img/main_small.png');

const styles = StyleSheet.create({
    full: {
        width: '100%',
        height: '100%',
    }
});

const sleep = (milliseconds: number) => {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};

class MainScreen extends Component<{ navigation: any }> {
    componentDidMount() {
        // Timeout to show main screen.
        setTimeout(async () => {
            const data = await this.getMovementTypes();
            const movementTypes = data ? data.movementTypes : null;
            const refresh_jwt = await this.checkUserDataPersist();

            if (movementTypes) {
                this.context.handleAppDataLoaded({movementTypes: movementTypes});
                if (refresh_jwt) {
                    const token = await this.refreshJWT(refresh_jwt);
                    if (token) {
                        const userData = await this.getUserData(token);
                        const {username} = userData.username;
                        this.context.handleUserLogging(username, token, refresh_jwt);
                        this.props.navigation.navigate('Account');
                    } else {
                        this.props.navigation.navigate('UserLogin');
                    }
                } else {
                    this.props.navigation.navigate('UserLogin');
                }
            } else {
                alert('Error al cargar la aplicación :(');
            }
        }, 3000);
    }

    async getUserData(token: string) {
        const query = `
            query{
                userData(
                    token:"${token}"
                ){
                    username
                }
            }
        `;

        const data = await GraphQl.query(query, urls.user);
        return data.userData
    }

    async refreshJWT(refresh_jwt: string) {
        const query = `
            mutation{
                refreshToken(refreshToken:"${refresh_jwt}"){
                    newToken
                }
            }
        `;
        const data = await GraphQl.query(query, urls.user);
        return data && data.refreshToken ? data.refreshToken.newToken : null;
    }

    async checkUserDataPersist() {
        return await LocalDataManagement.retrieveData('@jwt');
    }


    async getMovementTypes() {
        const query = `
            query{
                movementTypes{
                    movTypeId
                    movTypeDesc
                }
            }
        `;
        return await GraphQl.query(query, urls.movement);
    }

    render() {
        return (
            <ImageBackground
                source={bgImg}
                style={styles.full}
                resizeMode="contain"
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column-reverse',
                        margin: 10,
                    }}
                >
                    <Text style={{textAlign: 'center'}}>Cargando...</Text>
                    <Spinner color={'red'} size={'large'}/>
                </View>
            </ImageBackground>
        )
    }
}

MainScreen.contextType = AppContext;

export default MainScreen;