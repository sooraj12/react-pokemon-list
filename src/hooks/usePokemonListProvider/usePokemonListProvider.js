import { useContext } from "react";
import { PokemonContext } from "../../components/PokemonListView/PokemonListProvider";

function usePokemonListProvider() {
  const { searchTerm, keywords, sestSearchTerm, fetchNames } =
    useContext(PokemonContext);
  return { searchTerm, keywords, sestSearchTerm, fetchNames };
}

export { usePokemonListProvider };
