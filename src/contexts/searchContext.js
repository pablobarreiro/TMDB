import { React, createContext, useState } from 'react';

const initialState = {};

export const SearchContext = createContext(initialState);

 export const SearchContextProvider= ({children}) => {
    const [searchResults, setSearchResults] = useState([])
    const [typeSearch, setTypeSearch] = useState('movie')


    return  <SearchContext.Provider value={{searchResults,setSearchResults,typeSearch,setTypeSearch}}>{children}</SearchContext.Provider>
}
