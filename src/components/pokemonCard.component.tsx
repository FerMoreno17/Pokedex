/* eslint-disable react-hooks/exhaustive-deps */
import { Text, StyleSheet, Dimensions, Pressable, Image, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonPageResponse.interface';
import { FadeInImage } from './fadeInImage.component';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

interface PokemonCardProps {
    item: SimplePokemon;
}
export default function PokemonCard({ item }: PokemonCardProps) {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('screen');
    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);

    const styles = StyleSheet.create({
        card: {
            width: width * 0.45,
            height: height * 0.2,
            marginHorizontal: 5,
            marginVertical: 5,
            borderRadius: 10,
            shadow: {
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            backgroundColor: bgColor,
        },
        image: {
            width: width * 0.4,
            height: height * 0.18,
            position: 'absolute',
            right: -2,
            bottom: -5,
        },
        text: {
            fontSize: 18,
            fontWeight: '600',
            color: 'white',
            marginTop: 10,
            marginLeft: 10,
            alignSelf: 'flex-start',
        },
        pokebola: {
            width: 100,
            height: 100,
            position: 'absolute',
            bottom: -20,
            right: -20,
        },
        imageContainer: {
            width: 100,
            height: 100,
            position: 'absolute',
            bottom: 0,
            right: 0,
            opacity: 0.5,
            overflow: 'hidden',
        },
    });

    useEffect(() => {
        getColorsImage();
        return () => {
            isMounted.current = false;
        };
    }, []);

    async function getColorsImage() {
        const resultado = await ImageColors.getColors(item.imageUrl);
        if (!isMounted.current) {
            return;
        }

        switch (resultado.platform) {
            case 'android':
                setBgColor(resultado.dominant as string);
                break;
            case 'ios':
                setBgColor(resultado.primary);
                break;
            default: throw new Error('Unexpected platform key');
        }
    }

    function handlePress() {
        navigation.navigate('Detalle', { item: item, color: bgColor });
    }

    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <Text style={styles.text}>{item.name + `\n#${item.id}`}</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokebola}
                />
            </View>
            <FadeInImage uri={item.imageUrl} style={styles.image} />
        </Pressable>
    );
}
