/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, TextInput, Pressable, Alert, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import usePokemonSearch from '../hooks/usePagination copy';
import Spinner from '../components/spinner.component';
import { SimplePokemon } from '../interfaces/pokemonPageResponse.interface';
import PokemonCard from '../components/pokemonCard.component';
import useDebounceValue from '../hooks/useDebounceValue';

export default function BusquedaScreen() {
    const { loading, pokemonSearchList } = usePokemonSearch();
    const [inputValue, setInputValue] = useState('');
    const [filtroPokemon, setFiltroPokemon] = useState<SimplePokemon[]>([]);
    useDebounceValue(inputValue);
    const { top } = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            paddingTop: 15,
        },
        inputContainer: {
            flexDirection: 'row',
        },
        input: {
            backgroundColor: '#EDEDED',
            flex: 1,
            borderRadius: 30,
            paddingLeft: 20,
        },
        icon: {
            position: 'absolute',
            right: 20,
            width: 25,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        placeholder: {
            fontSize: 18,
            color: 'black',
        },
        title: {
            fontSize: 35,
            fontWeight: 'bold',
            color: '#000',
            top: top + 5,
            marginLeft: 15,
            alignSelf: 'flex-start',
        },
    });

    useEffect(() => {
        if (inputValue.length === 0) {
            return setFiltroPokemon([]);
        }
        setInputValue(inputValue);
        const filtro = pokemonSearchList.filter(
            buscado => buscado.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFiltroPokemon(filtro);
    }, [inputValue]);

    function renderPokemonCard(pokemon: SimplePokemon) {
        return <PokemonCard item={pokemon} />;
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput
                        placeholder={'Buscar pokemon'}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.placeholder}
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                </View>
                <Pressable
                    onPress={() => Alert.alert('tocado')}
                    style={styles.icon}>
                    <Icon
                        name="search"
                        size={23}
                        color={'black'}
                    />
                </Pressable>
            </View>
            <Text style={styles.title}>{inputValue}</Text>
            <FlatList
                data={filtroPokemon}
                renderItem={(pokemon) => renderPokemonCard(pokemon.item)}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </SafeAreaView>
    );
}
