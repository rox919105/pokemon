import React from 'react'
import s from './Pokemons.module.css'


const Pokemons = (props) => {
    let queryId = document.location.search.split('=')
    console.log(queryId);
    
    return (
        <div className={s.main}>
            {props.pokemons.length && props.pokemons.filter(pokemon => pokemon.data.name === queryId[1]).map(el =>
                <div key={el.data.name} className={s.loaded}>
                    <img src={el.data.sprites.front_default} className={s.pokIcon} alt='pokemon icon' />
                    <img src={el.data.sprites.back_default} className={s.pokIcon} alt='pokemon icon' />
                    <img src={el.data.sprites.front_shiny} className={s.pokIcon} alt='pokemon icon' />
                    <img src={el.data.sprites.back_shiny} className={s.pokIcon} alt='pokemon icon' />
                    {el.data.types.map(e => <div key={e.type.name} className={s.typesColor}> Type: <div className={s.typesValues}> {e.type.name} </div> </div>)}
                    <div className={s.pokInfoTextBlock}>
                        <div className={s.name}>Name : <span className={s.paramValue}>{el.data.name}</span> </div>
                        <div className={s.height}>Height : <span className={s.paramValue}>{el.data.height}</span></div>
                        <div className={s.weight}>Weight : <span className={s.paramValue}>{el.data.weight}</span></div>
                        <div className={s.base_experience}>Base Experience : <span className={s.paramValue}>{el.data.base_experience}</span></div>
                        {el.data.stats.map(e =>
                            <div key={e.stat.name}>
                                <span className={s.statsName}>{e.stat.name}</span> :
                                <span className={s.statsValue}> {e.base_stat}</span>
                            </div>)
                        }

                    </div>
                </div>
            )}
        </div>
    )
}

export default Pokemons