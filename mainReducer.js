import axios from "axios"

const GET_POKEMONS = 'GET_POKEMONS'
const GET_POKEMONS_NAME = 'GET_POKEMONS_NAME'
const SET_TOTAL_POKEMONS_COUNT = 'SET_TOTAL_POKEMONS_COUNT'
const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
const SET_PREVIOUS_PAGE = 'SET_PREVIOUS_PAGE'

let initialState = {
    pokemonsData: [],
    pokemonsToSearch: [],
    currentPage: 0,
    pageSize: 0,
    totalPokemonsCount: null,
    nextPage: null,
    previousPage: null
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_POKEMONS:
            return {
                ...state, pokemonsData: action.pokemon
            }
        case GET_POKEMONS_NAME:
            return {
                ...state, pokemonsToSearch: action.name
            }

        case SET_TOTAL_POKEMONS_COUNT:
            return {
                ...state, totalPokemonsCount: action.totalPokemonsCount
            }

        case SET_PAGE_SIZE:
            return {
                ...state, pageSize: action.pageSize
            }

        case SET_NEXT_PAGE:
            return {
                ...state, nextPage: action.nextPage
            }

        case SET_PREVIOUS_PAGE:
            return {
                ...state, previousPage: action.previousPage
            }

        default:
            return state
    }
}

export const getPokemonsAC = (pokemon) => ({ type: GET_POKEMONS, pokemon })
export const getPokemonsNamesAC = (name) => ({ type: GET_POKEMONS_NAME, name })
export const setTotalPokemonsCount = (totalPokemonsCount) => ({ type: SET_TOTAL_POKEMONS_COUNT, totalPokemonsCount })
export const setPageSize = (pageSize) => ({ type: SET_PAGE_SIZE, pageSize })
export const setNextPage = (nextPage) => ({ type: SET_NEXT_PAGE, nextPage })
export const setPreviousPage = (previousPage) => ({ type: SET_PREVIOUS_PAGE, previousPage })


export const getPokemons = (pageSize = initialState.pageSize || 15, offset = 0, totalPokemonsCount = initialState.totalPokemonsCount || 1100) => {
    let pokemons = [];
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
            const totalCount = await response.data
            dispatch(setTotalPokemonsCount(totalCount.count))
            dispatch(setNextPage(totalCount.next))
            dispatch(setPreviousPage(totalCount.previous))
            const arr = await response.data.results
            for await (let promise of arr) {
                const result = await getPokemonInfo(promise)
                pokemons.push(result)
                dispatch(getPokemonsAC(pokemons))
            }
            const pokNamesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemonsCount}&offset=${offset}`)
            dispatch(getPokemonsNamesAC(pokNamesResponse.data.results))
            
        } catch (e) {
            throw new Error(`getting list of pokemons went wrong`)
        }
    }
}
export const getInotherPage = (nextPage = initialState.nextPage, previousPage = initialState.previousPage) => {
    let pokemons = [];
    return async (dispatch) => {
        try {
            const response = await axios.get(nextPage || previousPage)
            const pages = await response.data
            dispatch(setNextPage(pages.next))
            dispatch(setPreviousPage(pages.previous))
            const arr = await response.data.results
            return Promise.all(arr.map(async pokemon => {
                const result = await getPokemonInfo(pokemon)
                pokemons.push(result)
            })).then(() => {
                dispatch(getPokemonsAC(pokemons))
            })
        } catch (e) {
            throw new Error(`getting list of pokemons went wrong`)
        }
    }
}

const getPokemonInfo = async (pokemon) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return response
    } catch (e) {
        throw new Error(`getting ${pokemon.name}'s details went wrong`);
    }
};

export default mainReducer