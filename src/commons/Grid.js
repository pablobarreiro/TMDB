import '../styles/Grid.css'
import Card from './Card'
import UserCard from './UserCard'

const Grid = ({searchList,isFavorite,isUser})=>{

    return (
        <div className='container'>
        {searchList.map((singleResult) => 
            isUser ? <UserCard singleResult={singleResult} key={singleResult.id}/>
            :
            <Card singleResult={singleResult} isFavorite={isFavorite} key={singleResult.id}/>
        )}
        </div>
    )
}

export default Grid