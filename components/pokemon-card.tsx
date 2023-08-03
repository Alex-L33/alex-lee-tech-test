import Image from "next/image";
import { Heart } from "lucide-react";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  id: number;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

export function PokemonCard({
  id,
  name,
  imageUrl,
  isFavourite,
  onToggleFavourite,
}: PokemonCardProps) {
  const formattedId = String(id).padStart(4, "0");

  const handleToggleFavourite = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onToggleFavourite();
  };

  return (
    <>
      <div className="bg-white group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 cursor-pointer text-center flex flex-col">
        <div className="flex flex-col items-end">
          <Heart
            onClick={handleToggleFavourite}
            className={`h-6 w-6 cursor-pointer ${
              isFavourite
                ? "text-red-500 fill-red-500"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        </div>
        <h2 className="text-xl font-bold">
          <div className="flex items-center justify-center pb-5">
            <Image
              src={imageUrl}
              width={100}
              height={100}
              alt={`Image of ${name}`}
            />
          </div>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <p className="text-slate-400">{formattedId}</p>
      </div>
    </>
  );
}
