import React from 'react';
import {Linking, TouchableOpacity} from "react-native";
import {Text} from "native-base";

const TextLink = (props: { url: string; text: string }) => {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(props.url)}>
            <Text style={{color: 'blue'}}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
};

export default TextLink;