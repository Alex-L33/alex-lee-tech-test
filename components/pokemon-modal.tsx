import { PokemonDetails } from "@/lib/pokeAPI";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, Heart } from "lucide-react";

interface PokemonModalProps {
  pokemon: PokemonDetails | null;
  onClose: () => void;
  onToggleFavourite: () => void;
  isFavourite: boolean;
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export function PokemonModal({
  pokemon,
  onClose,
  isFavourite,
  onToggleFavourite,
}: PokemonModalProps) {
  if (!pokemon) return null;

  const formattedId = String(pokemon.data.id).padStart(4, "0");
  console.log("pokemon", pokemon);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-center">
      <div className="relative bg-white rounded-lg flex flex-col lg:flex-row">
        <Button
          className="z-100 absolute -right-4 transform -translate-y-1/2"
          variant={"roundX"}
          size={"rounded"}
          onClick={onClose}
        >
          <X className="font-bold h-8 w-8" />
        </Button>
        <div className="flex flex-col items-center p-8">
          <div className="pl-52 pb-4">
            <Heart
              onClick={onToggleFavourite}
              className={`h-10 w-10 cursor-pointer ${
                isFavourite
                  ? "text-red-500 fill-red-500"
                  : "fill-slate-200 text-slate-200"
              }`}
            />
          </div>
          <Image
            src={pokemon.data.sprites.other["official-artwork"].front_default}
            width={200}
            height={200}
            alt={`Image of ${pokemon.name}`}
          />
          <h2 className="text-5xl font-bold mt-16">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <p className="text-slate-400 text-5xl">{formattedId}</p>
        </div>
        <div className="bg-slate-200 rounded-r-lg text-left">
          <div className="p-8">
            <h2 className="text-2xl font-bold pl-1">Stats</h2>
            <table className="border-separate border-spacing-2">
              <tbody>
                <tr className="even:bg-slate-100 odd:bg-white">
                  <td className="p-1 px-2">Height</td>
                  <td className="p-1 pl-24">{pokemon.data.height}</td>
                </tr>
                <tr className="even:bg-slate-100 odd:bg-white">
                  <td className="p-1 px-2">Weight</td>
                  <td className="p-1 pl-24">{pokemon.data.weight}</td>
                </tr>
                {pokemon.data.stats.map((stat: Stats, index: number) => (
                  <tr key={index} className="even:bg-slate-100 odd:bg-white">
                    <td className="p-1 px-2 pr-40">
                      {stat.stat.name.charAt(0).toUpperCase() +
                        stat.stat.name.slice(1)}
                    </td>
                    <td className="p-1 px-2 pl-24">{stat.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
