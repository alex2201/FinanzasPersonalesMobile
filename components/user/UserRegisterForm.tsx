import React from 'react';
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
import {Linking, StyleSheet, TouchableOpacity} from "react-native";
import {GraphQl} from "../../GraphQl";
import urls from "../../url";
import TextLink from "../generic/TextLink";

class UserRegisterForm extends React.Component<{ navigation: any }> {
    state = {
        username: '',
        password: '',
        validUsername: true,
        validPassword: false,
        verifyPassword: false,
        acceptTerms: false,
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
    }

    render() {
        return (
            <Container>
                <Header
                    noLeft
                >
                    <Body>
                        <Title>
                            Registro
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
                                // autoFocus
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
                                checked={this.state.acceptTerms}
                                onPress={() => this.setState({
                                    ...this.state,
                                    acceptTerms: !this.state.acceptTerms,
                                })}
                            />
                            <Body>
                                <Text>Acepto los términos y condiciones</Text>
                                <TextLink url={'http://www.godinfinanciero.com.mx'} text={'Más información'}/>
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
                        onPress={() => alert('Registro')}
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

export default UserRegisterForm;