// בס"ד
import '../remind/remind.css'
import { useSelector } from 'react-redux'
import { RemindOffQueue } from '../remindOffQueue/remindOffQueue'


export const Remind = () => {


const fixedQ = useSelector(state => state.QueuesSlice.listOfQueues )

    return <div>
       
        <h2>תיזכורות לימים הקרובים</h2>
        {console.log(fixedQ,'fixedQ')}

        {fixedQ && fixedQ.map(q => {return(

         q.isReminded == 0 ?<section className='qs'><RemindOffQueue queueToRemind={q} setFlagOpen = {null}/></section>  : ''
        )})}

    </div>
}