import React from 'react'
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {
    Body,
    Button,
    CheckBox,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    ListItem,
    Text,
    Title
} from "native-base";
import AppContext from "../../AppContext";
import {LocalDataManagement} from "../../LocalDataManagement";
import {GraphQl} from "../../GraphQl";
import urls from "../../url";


class LoginForm extends React.Component<{ navigation: any }> {
    state = {
        username: '',
        password: '',
        validUsername: true,
        validPassword: true,
        keepLogged: false,
    };

    async handleSubmit() {
        const {username, password} = this.state;
        const query = `
            mutation{
                authUser(username: "${username}", password: "${password}"){
                    jwt: accessToken
                    refresh_jwt: refreshToken
                }
            }
        `;
        const data = await GraphQl.query(query, urls.user);
        const {jwt, refresh_jwt} = data.authUser;
        if (jwt) { // Successful login
            if (this.state.keepLogged) { // Keep login
                await LocalDataManagement.storeData('@jwt', refresh_jwt);
            }
            this.context.handleUserLogging(this.state.username, jwt, refresh_jwt);
            this.props.navigation.navigate('Account');
        }
    }

    render() {
        return (
            <Container>
                <Header
                    noLeft
                >
                    <Body>
                        <Title>
                            Acceso
                        </Title>
                    </Body>
                </Header>
                <Content
                    contentContainerStyle={styles.content}
                >
                    <Form
                        style={styles.form}
                    >
                        <Item
                            stackedLabel
                        >
                            <Label>Nombre Usuario</Label>
                            <Icon type={'Ionicons'} active name='md-person'/>
                            <Input
                                autoCorrect={false}
                                autoCompleteType={'username'}
                                autoFocus
                                clearButtonMode='always'
                                textContentType={'username'}
                                maxLength={64}
                                value={this.state.username}
                                onChangeText={(text) => {
                                    this.setState({
                                        ...this.state,
                                        username: text,
                                    })
                                }}
                            />
                        </Item>
                        <Item
                            stackedLabel
                        >
                            <Label>Contraseña</Label>
                            <Icon type={'Ionicons'} active name='md-key'/>
                            <Input
                                secureTextEntry
                                clearButtonMode='always'
                                maxLength={64}
                                textContentType={'password'}
                                value={this.state.password}
                                onChangeText={(text) => {
                                    this.setState({
                                        ...this.state,
                                        password: text,
                                    })
                                }}
                            />
                        </Item>
                        <ListItem
                            last
                        >
                            <CheckBox
                                checked={this.state.keepLogged}
                                onPress={() => this.setState({
                                    ...this.state,
                                    keepLogged: !this.state.keepLogged,
                                })}
                            />
                            <Body>
                                <Text>Mantener Sesión Iniciada</Text>
                            </Body>
                        </ListItem>
                    </Form>
                    <Button
                        block
                        primary
                        style={styles.button}
                        onPress={this.handleSubmit.bind(this)}
                    >
                        <Text>
                            Acceder
                        </Text>
                    </Button>
                    <Button
                        block
                        primary
                        transparent
                        onPress={() => this.props.navigation.navigate('UserRegister')}
                        style={styles.button}
                    >
                        <Text>
                            Registrarse
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
    content: {
        margin: 10,
    },
    form: {
        margin: 10,
    },
});

LoginForm.contextType = AppContext;

export default LoginForm;