import React from 'react';
import { View, Image, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePagination from '../hooks/usePagination';
import { SimplePokemon } from '../interfaces/pokemonPageResponse.interface';
import PokemonCard from '../components/pokemonCard.component';
import Spinner from '../components/spinner.component';

export default function HomeScreen() {
    const { top } = useSafeAreaInsets();
    const { width, height } = Dimensions.get('screen');
    const { loading, simplePokemonList, loadPage } = usePagination();

    const styles = StyleSheet.create({
        image: {
            width: 300,
            height: 300,
            position: 'absolute',
            top: -100,
            right: -100,
            opacity: 0.2,
        },
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: '#000',
            top: top + 5,
            marginLeft:15,
            alignSelf:'flex-start',
        },
    });

    function renderPokemonCard(pokemon: SimplePokemon) {
        return <PokemonCard item={pokemon} />;
    }

    if (loading) {
        return (
            <Spinner />
        );
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Pokedex</Text>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.image}
            />
            <FlatList
                data={simplePokemonList}
                renderItem={(pokemon) => renderPokemonCard(pokemon.item)}
                keyExtractor={(item) => item.id}
                onEndReached={loadPage}
                onEndReachedThreshold={0.4}
                numColumns={2}
            />
        </View >
    );
}
