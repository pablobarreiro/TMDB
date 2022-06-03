import '../styles/Card.css'
import {Link} from 'react-router-dom'

const UserCard = ({singleResult})=>{
    
    return(
        <div className='card-containerUsers'>
            <div className='card-filling' />
            <Link className='card-value' to={`/users/${singleResult.id}/favorites`}>
                {`#${singleResult.id}: ${singleResult.username}`}
            </Link>
            <div className='card-filling' />
        </div>
    )
}

export default UserCard