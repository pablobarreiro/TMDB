import '../styles/Card.css'
import {Link} from 'react-router-dom'
import { useContext, useEffect, } from 'react'

import { FavoriteContext } from '../contexts/favoriteContext'
import { AuthContext } from '../contexts/authContext'

const Card = ({singleResult, isFavorite})=>{
    const {removeFromFavorite} = useContext(FavoriteContext)
    const {user} = useContext(AuthContext)
    const type = singleResult.title ? 'movie' : 'tv'

    return (
        <div className='card-container'>
            <Link className='card-value' to={`/single/${type}/${singleResult.id}`}>
            {singleResult.poster_path && <img src={ `https://image.tmdb.org/t/p/w154/${singleResult.poster_path}`} /> }
            {type === 'movie' ? `${singleResult.title}` : `${singleResult.name}`}
            </Link>
            {isFavorite && <button className='card-button' onClick={()=>removeFromFavorite(singleResult.id,user.id)}>Remover</button> }
        </div>
    )
}

export default Card