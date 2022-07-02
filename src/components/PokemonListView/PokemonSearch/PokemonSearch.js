import { useQuery } from "react-query";

import { SearchSuggestions } from "../../SearchSuggestions";
import { usePokemonListProvider } from "../../../hooks";

function PokemonSearch() {
  const { searchTerm, sestSearchTerm, fetchNames } = usePokemonListProvider();

  const { data = [] } = useQuery(
    ["names", searchTerm],
    () => fetchNames(searchTerm),
    { keepPreviousData: true }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchSuggestions
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={sestSearchTerm}
          items={data}
          getItemKey={(item) => item.id}
          getItemValue={(item) => item.name}
        />
      </form>
    </div>
  );
}

export { PokemonSearch };
