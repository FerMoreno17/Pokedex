/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    ImageErrorEventData,
    ImageStyle,
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    View,
} from 'react-native';
import { useAnimation } from '../hooks/useAnimation';


interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} }: Props) => {

    const { opacity, fadeIn } = useAnimation();
    const [isLoading, setIsLoading] = useState(true);

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            ...style as any,
        },
        activity: {
            position: 'absolute',
        },
        animatedImage:{
            ...style as any,
            opacity,
        },
    });

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    };

    const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>

            {
                isLoading &&
                <ActivityIndicator
                    style={styles.activity}
                    color="grey"
                    size={30}
                />
            }

            <Animated.Image
                source={{ uri }}
                onError={onError}
                onLoad={finishLoading}
                style={styles.animatedImage}
            />

        </View>
    );
};
