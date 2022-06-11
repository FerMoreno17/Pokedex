import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { PokemonInfoResponse } from '../interfaces/pokemonInfoResponse.interface';
import { FadeInImage } from './fadeInImage.component';

interface PokemonDetailsProps {
    info: PokemonInfoResponse;
}
export default function PokemonDetails({ info }: PokemonDetailsProps) {
    const styles = StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
            paddingHorizontal: 20,
        },
        section: {
            marginBottom: 10,
        },
        titleSec: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#000',
        },
        sprites: {
            width: 100,
            height: 100,
        },
        desc: {
            fontSize: 20,
            color: '#000',
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.titleSec}>
                    Tipo
                </Text>
                <Text style={styles.desc}>
                    {info.types.map(type => type.type.name + '  ')}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.titleSec}>
                    Peso
                </Text>
                <Text style={styles.desc}>
                    {info.weight}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.titleSec}>
                    Capturas
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FadeInImage
                        uri={info.sprites.front_default}
                        style={styles.sprites}
                    />
                    <FadeInImage
                        uri={info.sprites.back_default}
                        style={styles.sprites}
                    />
                    <FadeInImage
                        uri={info.sprites.front_shiny}
                        style={styles.sprites}
                    />
                    <FadeInImage
                        uri={info.sprites.back_shiny}
                        style={styles.sprites}
                    />
                </ScrollView>
            </View>
            <View style={styles.section}>
                <Text style={styles.titleSec}>
                    Habilidades
                </Text>
                <Text style={styles.desc}>
                    {info.abilities.map(hab => hab.ability.name + '  ')}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.titleSec}>
                    Movimientos
                </Text>
                <Text style={styles.desc}>
                    {info.moves.map(move => move.move.name + ' - ')}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.titleSec}>
                    Estadísticas
                </Text>
                <Text style={styles.desc}>
                    {info.stats.map(stat => stat.stat.name + '\t' + stat.base_stat + '\n')}
                </Text>
            </View>
        </ScrollView>
    );
}
