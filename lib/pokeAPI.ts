const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  data: {
    id: number;
    height: number;
    weight: number;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    stats: [];
  };
}

export async function getPokemonData(): Promise<PokemonDetails[]> {
  const res = await fetch(POKEAPI_BASE_URL + "pokemon?limit=151&offset=0");
  const data = await res.json();

  const promises = data.results.map(async (pokemon: Pokemon) => {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    return {
      ...pokemon,
      data,
    } as PokemonDetails;
  });

  const allPokemonData = await Promise.allSettled(promises);

  // Filter out fulfilled promises and extract their values
  const resolvedPokemonData = allPokemonData
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<PokemonDetails>).value);

  console.log('detailedPokemonData', resolvedPokemonData);
  return resolvedPokemonData;
}
