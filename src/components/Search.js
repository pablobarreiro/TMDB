import '../styles/Search.css'
import Grid from '../commons/Grid'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import {SearchContext} from '../contexts/searchContext'
import useInput from '../hooks/useInput'

const Search = () => {
  const searchQuery = useInput()
  const {searchResults,setSearchResults,typeSearch,setTypeSearch} = useContext(SearchContext)
  
  const searching = typeSearch === 'movie' ? 'Peliculas' : typeSearch === 'tv' ? 'Series' : 'Usuarios'
  
  const getData = (query)=>{
    if(typeSearch !=='user') {
      return axios.get(`https://api.themoviedb.org/3/search/${typeSearch}?api_key=f1a9053523aef8cf0734bcc18bd6c874&language=en-US&query=${query}&page=1&include_adult=false`)
    } else {
      return axios.get(`/api/users/search/${query.toLowerCase()}`)
    }
  }

  useEffect(()=>{
      if(searchQuery.value.length <=2) setSearchResults([])
      if (searchQuery.value.length > 2) getData(searchQuery.value)
      .then(res => res.data)
      .then(data => {
        if(typeSearch !== 'user') setSearchResults(data.results)
        else setSearchResults(data)})
  },[searchQuery.value,typeSearch])

  return (
    <div>
      <div>
        <h2 className='search-title'>¿Que Estas buscando?</h2>
        <div className='search-buttons'>
          <button className='search-button' onClick={()=>{
            setSearchResults([])
            setTypeSearch('movie')
            }}>Peliculas</button>
          <button className='search-button' onClick={()=>{
            setSearchResults([])
            setTypeSearch('tv')
            }}>Series</button>
          <button className='search-button' onClick={()=>{
            setSearchResults([])
            setTypeSearch('user')
            }}>Usuarios</button>
        </div>
      </div>
      <div className='search-title'>Buscando {searching}</div>
      <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <input
        className='search-input'
        type="text"
        placeholder={`ingresa nombre de ${searching.slice(0,searching.length-1).toLowerCase()}`}
        onChange={searchQuery.onChange}
        value={searchQuery.value}
        />
      </form>
      
      {searchResults[0] && <p className='search-results'>Resultados de la busqueda</p>}
      {searchResults[0] && <Grid searchList={searchResults} remove={false} isUser={typeSearch === 'user' ? true :false}/>}
    </div>
  )
}

export default Search