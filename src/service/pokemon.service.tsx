import axios from 'axios';
import { PokemonInfoResponse } from '../interfaces/pokemonInfoResponse.interface';
import { PokemonPageResponse } from '../interfaces/pokemonPageResponse.interface';

export const pokemonService = axios.create();
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemonList(url: string) {
    const respuesta = await pokemonService.get<PokemonPageResponse>(url);
    // console.log(JSON.stringify(respuesta.data, null, 2));
    return respuesta;
}

export async function getPokemonInfo(id: string) {
    const respuesta = await pokemonService.get<PokemonInfoResponse>(baseUrl + `/${id}`);
    return respuesta;
}
