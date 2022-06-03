import '../styles/Favorites.css'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Grid from '../commons/Grid'

import { FavoriteContext } from "../contexts/favoriteContext"


const Favorites = ()=>{
    const {favorites,getFavorites} = useContext(FavoriteContext)
    const {id} = useParams()
    const [actualUser,setActualUser] = useState({})
    const [actualFavorites,setActualFavorites] = useState([])
    

    useEffect(() => {
        axios.get(`/api/users/${id}`)
        .then(res=>res.data)
        .then(returnedUser => setActualUser(returnedUser))
        
        const fav=[]
        const promises = []
        Promise.resolve(getFavorites(id))        
        .then(()=>{
            favorites.forEach(favorite => {
                promises.push(
                    axios.get(`https://api.themoviedb.org/3/${favorite.type}/${favorite.title_id}?api_key=f1a9053523aef8cf0734bcc18bd6c874&language=en-US`)
                    .then(res=>res.data)
                    .then(movie => {
                        fav.push(movie)
                    })
                )
            })
        Promise.all(promises).then(() => setActualFavorites(fav))
        })
    },[id])
    

    if(favorites.length === actualFavorites.length) return (
        <div className='favorites-container'>
        <h1 className='favorites-title'>Favoritos de {actualUser.username}</h1>
        <Link to='/search' >
            <button className="favorites-button">Volver a la busqueda</button>
        </Link>
        
        {actualFavorites.length ? <Grid searchList={actualFavorites} isFavorite={true} /> : <p>No hay favoritos...</p>}
        </div>
    )

    return <></>

}


export default Favorites