import axios from 'axios';
import { React, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = [];

export const FavoriteContext = createContext(initialState);

export const FavoriteContextProvider= ({children}) => {
    const navigate = useNavigate()
    const [favorites, setFavorites]= useState([])


    const getFavorites = (userId) =>{
        return axios.get(`/api/users/${userId}/favorites`)
        .then(res => res.data)
        .then(allFavorites => {
            setFavorites(allFavorites)
        })
    }

    const addToFavorite = (singleSearch,userId,type) => {
        axios.post(`/api/users/${userId}/favorites/add`, {singleSearch,type})
        .then(()=> {
            getFavorites(userId)
            navigate(`/users/${userId}/favorites`)
        })    
    }

    const removeFromFavorite = (singleSearchId,userId) => {
        axios.delete(`/api/users/${userId}/favorites/${singleSearchId}`)
        .then(()=> getFavorites(userId))
    }


return  <FavoriteContext.Provider value={{favorites,addToFavorite,removeFromFavorite,getFavorites}}>{children}</FavoriteContext.Provider>
}
