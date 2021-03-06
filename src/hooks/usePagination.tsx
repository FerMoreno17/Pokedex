import { useEffect, useRef, useState } from 'react';
import { PokemonNameUrl, SimplePokemon } from '../interfaces/pokemonPageResponse.interface';
import { getPokemonList } from '../service/pokemon.service';

export default function usePagination() {
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadPage() {
        setLoading(true);
        const respuesta = await getPokemonList(nextPageUrl.current);
        nextPageUrl.current = respuesta.data.next;
        mapPokemonList(respuesta.data.results);
    }

    function mapPokemonList(pokemonList: PokemonNameUrl[]) {
        const temp_list: SimplePokemon[] = pokemonList.map(
            item => {
                const urlParts = item.url.split('/');
                const id = urlParts[urlParts.length - 2];
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
                return {
                    id: id,
                    imageUrl: image,
                    name: item.name,
                };
            });
        //de esta forma se guarda el nuevo listado y
        //se suma al guardado anteriormente
        setSimplePokemonList([...simplePokemonList, ...temp_list]);
        setLoading(false);
    }

    return { simplePokemonList, loading, loadPage };
}
