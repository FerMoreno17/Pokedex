import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { RootStackParams } from '../navigation/navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/fadeInImage.component';
import usePokemon from '../hooks/usePokemon';
import Spinner from '../components/spinner.component';
import PokemonDetails from '../components/pokemonDetails.component';

interface DetalleScreenProps extends NativeStackScreenProps<RootStackParams, 'Detalle'> { };

export default function DetalleScreen({ navigation, route }: DetalleScreenProps) {
    const { color, item } = route.params;
    const { width, height } = Dimensions.get('screen');
    const { top } = useSafeAreaInsets();
    const { pokemonInfo, loading } = usePokemon(item.id);

    const styles = StyleSheet.create({
        containerTop: {
            backgroundColor: color,
            flex: 1.5,
            zIndex: 999,
            alignItems: 'center',
            borderBottomRightRadius: 1000,
            borderBottomLeftRadius: 1000,
        },
        iconContainer: {
            position: 'absolute',
            top: 10,
            left: 10,
            width: 40,
            height: 40,
            borderRadius: 100,
            borderColor: 'white',
            borderWidth: 3,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 3,
            opacity: 0.4,
        },
        name: {
            color: 'white',
            fontSize: 30,
            position: 'absolute',
            top: top + 50,
            left: 10,
        },
        image: {
            width: width * 0.7,
            height: height * 0.3,
            bottom: -60,
            opacity: 0.4,
        },
        pokemonImage: {
            width: width * 0.7,
            height: height * 0.3,
            position: 'absolute',
            bottom: -15,
        },
        containerBottom: {
            flex: 2,
        }
    });

    function handleBack() {
        navigation.pop();
    }

    return (
        <>
            <View style={styles.containerTop}>
                <Text style={styles.name}>
                    {item.name.toLocaleUpperCase() + `\n#${item.id}`}
                </Text>
                <Pressable
                    onPress={handleBack}
                    style={styles.iconContainer}
                >
                    <Icon
                        name="chevron-left"
                        size={20}
                        color="white"
                    />
                </Pressable>
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.image}
                />
                <FadeInImage
                    uri={item.imageUrl}
                    style={styles.pokemonImage}
                />
            </View>

            <View style={styles.containerBottom}>
                {loading
                    ? <Spinner />
                    : <PokemonDetails info={pokemonInfo!} />
                }
            </View>
        </>
    );
}
