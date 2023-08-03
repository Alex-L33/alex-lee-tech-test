import { CardGrid } from "@/components/card-grid";
import { getPokemonData } from "@/lib/pokeAPI";

export default async function Home() {
  const pokemonList = await getPokemonData();
  return <CardGrid pokemonList={pokemonList} />;
}
