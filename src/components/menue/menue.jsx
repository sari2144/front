// בס"ד

import { Link } from 'react-router-dom'
import './menue.css'

export const Menue = () => {

    

    return <div>
        <header className='menue'>
            <Link to={'/ccc'}><button className='link'>ללו"ז</button></Link>
            <Link to={'/search'}><button className='link'>חיפוש תורים</button></Link>
            <Link to={'/login'}><button className='link'>הוספת לקוחות</button></Link>
            <Link to={'/manager'}><button className='link'>ניהול</button></Link>
            <Link to={'/remind'}><button className='link'>תיזכורות</button></Link>
        </header>
    </div>

}