import { useEffect, useState } from 'react';
import { getPokemonInfo } from '../service/pokemon.service';
import { PokemonInfoResponse } from '../interfaces/pokemonInfoResponse.interface';

export default function usePokemon(id: string) {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoResponse>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPokemonData();
    }, []);


    async function getPokemonData() {
        const respuesta = await getPokemonInfo(id);
        setPokemonInfo(respuesta.data);
        setLoading(false);
    }
    return {
        pokemonInfo,
        loading,
    };
}
