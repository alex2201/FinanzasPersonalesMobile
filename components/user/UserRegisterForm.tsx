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
    Label, Left,
    ListItem,
    Text,
    Title
} from "native-base";
import {Linking, StyleSheet, TouchableOpacity} from "react-native";
import {GraphQl} from "../../GraphQl";
import urls from "../../url";
import TextLink from "../generic/TextLink";

const validationRules = {
    email: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'),
    username: new RegExp('^[a-zA-Z0-9]+$'),
    password: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})"),
};

class UserRegisterForm extends React.Component<{ navigation: any }> {
    state = {
        email: '',
        username: '',
        password: '',
        verifyPassword: '',
        validEmail: false,
        validUsername: false,
        validPassword: false,
        validVerifyPassword: false,
        acceptTerms: false,
        isSubmitting: false,
    };

    async handleSubmit() {
        const {username, password, email} = this.state;
        const query = `
            mutation{
                authUser(username: "${username}", password: "${password}"){
                    jwt: accessToken
                    refresh_jwt: refreshToken
                }
            }
        `;
        // const data = await GraphQl.query(query, urls.user);
        this.setState({
            isSubmitting: false,
        })
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
                            error={!this.state.validEmail}
                            success={this.state.validEmail}
                        >
                            <Label>Correo Electrónico</Label>
                            <Icon type={'Ionicons'} active name='md-at'/>
                            <Input
                                // autoFocus
                                placeholder={'ejemplo@dominio.com.mx'}
                                // Semantics for android and ios.
                                autoCompleteType={'email'}
                                textContentType={'emailAddress'}
                                autoCorrect={false}
                                clearButtonMode='always'
                                maxLength={128}
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState({
                                        ...this.state,
                                        email: text,
                                    })
                                }}
                                onEndEditing={() => this.setState({
                                    ...this.state,
                                    validEmail: validationRules.email.test(this.state.email),
                                })}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            error={!this.state.validUsername}
                            success={this.state.validUsername}
                        >
                            <Label>Nombre Usuario</Label>
                            <Icon type={'Ionicons'} active name='md-person'/>
                            <Input
                                autoCorrect={false}
                                autoCompleteType={'username'}
                                placeholder={'usuario001'}
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
                                onEndEditing={() => this.setState({
                                    ...this.state,
                                    validUsername: validationRules.username.test(this.state.username),
                                })}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            error={!this.state.validPassword}
                            success={this.state.validPassword}
                        >
                            <Label>Contraseña (8 caracteres, al menos una mayúscula, al menos un número y al menos un
                                caracter especial)</Label>
                            <Icon type={'Ionicons'} active name='md-key'/>
                            <Input
                                placeholder={'Contraseña.segura1'}
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
                                onEndEditing={() => this.setState({
                                    ...this.state,
                                    validPassword: validationRules.password.test(this.state.password),
                                })}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            error={!this.state.validVerifyPassword}
                            success={this.state.validVerifyPassword}
                        >
                            <Label>Confirmar Contraseña</Label>
                            <Icon type={'Ionicons'} active name='md-key'/>
                            <Input
                                placeholder={'Repite tu contraseña'}
                                secureTextEntry
                                clearButtonMode='always'
                                maxLength={64}
                                textContentType={'password'}
                                value={this.state.verifyPassword}
                                onChangeText={(text) => {
                                    this.setState({
                                        ...this.state,
                                        verifyPassword: text,
                                    })
                                }}
                                onEndEditing={() => this.setState({
                                    ...this.state,
                                    validVerifyPassword: this.state.verifyPassword !== ''
                                        && this.state.password === this.state.verifyPassword,
                                })}
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
                        disabled={this.state.isSubmitting}
                        block
                        style={styles.button}
                        onPress={() => {
                            this.handleSubmit();
                            this.setState({
                                isSubmitting: true
                            });
                        }}
                    >
                        <Text>
                            Registrarme
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