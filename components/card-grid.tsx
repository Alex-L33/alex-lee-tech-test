"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonDetails } from "@/lib/pokeAPI";
import { PokemonModal } from "@/components/pokemon-modal";

interface CardGridProps {
  pokemonList: PokemonDetails[];
}

export function CardGrid({ pokemonList }: CardGridProps) {
  const [searchText, setSearchText] = useState("");
  const [visibleCardCount, setVisibleCardCount] = useState(10);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [favourites, setFavourites] = useState<number[]>([]);

  const loadMoreCards = () => {
    setVisibleCardCount((prevCount) => prevCount + 10);
  };

  const openModal = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const saveFavoritesToLocalStorage = (favorites: number[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const loadFavoritesFromLocalStorage = () => {
    const favoritesData = localStorage.getItem("favorites");
    if (favoritesData) {
      return JSON.parse(favoritesData);
    }
    return [];
  };

  const toggleFavourite = (pokemonId: number) => {
    const newFavourites = favourites.includes(pokemonId)
      ? favourites.filter((favId: number) => favId !== pokemonId)
      : [...favourites, pokemonId];
    setFavourites(newFavourites);
  };

  useEffect(() => {
    const favoritesFromStorage = loadFavoritesFromLocalStorage();
    setFavourites(favoritesFromStorage);
  }, []);

  useEffect(() => {
    saveFavoritesToLocalStorage(favourites);
  }, [favourites]);

  const searchFilter = (pokemonList: PokemonDetails[]): PokemonDetails[] => {
    return pokemonList.filter((pokemon) => {
      const idMatchesFormatted =
        String(pokemon.data.id).padStart(4, "0") === searchText;
      const nameMatches = pokemon.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return idMatchesFormatted || nameMatches;
    });
  };

  const filteredPokemonList = searchFilter(pokemonList).slice(
    0,
    visibleCardCount
  );

  return (
    <>
      <div>
        {pokemonList && pokemonList.length > 0 ? (
          <>
            <h3 className="text-lg py-4">
              Search for a Pokemon by name or id number
            </h3>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
              <Input
                type="text"
                value={searchText}
                id="pokemonSearch"
                placeholder="Name or id number"
                onChange={(e) => setSearchText(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:grid-cols-6 lg:text-left">
              {filteredPokemonList.map((pokemon: PokemonDetails) => {
                const isFavourite = favourites.includes(pokemon.data.id);
                return (
                  <div
                    key={pokemon.data.id}
                    onClick={() => openModal(pokemon)}
                    className="cursor-pointer"
                  >
                    <PokemonCard
                      id={pokemon.data.id}
                      name={pokemon.name}
                      imageUrl={
                        pokemon.data.sprites.other["official-artwork"]
                          .front_default
                      }
                      isFavourite={isFavourite}
                      onToggleFavourite={() => toggleFavourite(pokemon.data.id)}
                    />
                  </div>
                );
              })}
              <div className="flex items-center">
                {filteredPokemonList.length < 10 || filteredPokemonList.length < pokemonList.length && (
                  <Button
                    className="w-full"
                    variant={"loadMore"}
                    onClick={loadMoreCards}
                  >
                    Load More
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>
            No pokemon found, please check your network connection and try
            again.
          </p>
        )}
        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            onClose={closeModal}
            isFavourite={
              selectedPokemon
                ? favourites.includes(selectedPokemon.data.id)
                : false
            }
            onToggleFavourite={() =>
              toggleFavourite(selectedPokemon?.data.id || 0)
            }
          />
        )}
      </div>
    </>
  );
}
