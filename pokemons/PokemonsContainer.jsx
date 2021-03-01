import { connect } from "react-redux"
import Pokemons from "./Pokemons"


let mapStateToProps = (state) => {
    return {
        pokemons: state.mainPage.pokemonsData
    }
}

export default connect(mapStateToProps, {})(Pokemons)