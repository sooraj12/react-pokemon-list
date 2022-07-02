import { PokemonListProvider } from "./PokemonListProvider";
import { PokemonSearch } from "./PokemonSearch";
import { PokemonList } from "./PokemonList";

function PokemonListView() {
  return (
    <div className="bg-[#f2f9fb] min-h-screen rounded-lg px-10 py-10">
      <PokemonListProvider>
        <PokemonSearch />
        <PokemonList />
      </PokemonListProvider>
    </div>
  );
}

export { PokemonListView };
