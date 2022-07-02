import { useReducer } from "react";
import axios from "axios";

const endPoint = "https://beta.pokeapi.co/graphql/v1beta";
const axiosInstance = axios.create({
  baseURL: endPoint,
  method: "POST",
});

const ACTIONS = {
  set_search_term: "set_search_term",
  set_list_loading: "set_list_loading",
  set_list_items: "set_list_items",
  update_list_items: "update_list_items",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.set_search_term:
      return {
        ...state,
        searchTerm: action.data,
      };
    default:
      return state;
  }
};

function usePokemonList() {
  const INITIAL_STATE = {
    searchTerm: "",
    list: {
      item: [],
      isLoading: true,
      size: 0,
      maxSize: 0,
    },
    // can store upto 3 recent searches
    recents: [],
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  //   set search term
  const sestSearchTerm = (term) => {
    setState({ type: ACTIONS.set_search_term, data: term });
  };

  const getNamesQuery = (prefix) => {
    return `
      {
        pokemon_v2_pokemon(where: {name: {_regex: ${prefix}}}, limit: 10, offset: 0) {
          name
          id
        }
      }
      `;
  };

  const fetchNames = async (searchTerm) => {
    if (!searchTerm) {
      return [];
    }
    const { data } = await axiosInstance({
      data: {
        query: getNamesQuery(searchTerm.toLowerCase()),
      },
    });
    return data.data.pokemon_v2_pokemon;
  };

  return {
    searchTerm: state.searchTerm,
    sestSearchTerm,
    fetchNames,
  };
}

export { usePokemonList };
