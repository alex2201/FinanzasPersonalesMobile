import React from 'react';
import {Button, Container, Text} from "native-base";
import AppContext from "../../AppContext";
import {LocalDataManagement} from "../../LocalDataManagement";

class AccountScreen extends React.Component<{ navigation: any }> {
    render() {
        return (
            <Container>
                <Text>Cuentas</Text>
                <Button
                    onPress={async () => {
                        this.context.handleUserLogout();
                        await LocalDataManagement.removeData('@jwt');
                        this.props.navigation.navigate('Login');
                    }}
                >
                    <Text>
                        Logout
                    </Text>
                </Button>
            </Container>
        );
    }
}

AccountScreen.contextType = AppContext;

export default AccountScreen;