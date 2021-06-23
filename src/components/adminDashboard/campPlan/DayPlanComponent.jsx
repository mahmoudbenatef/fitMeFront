import {
    useParams
} from "react-router-dom";
import { Link } from "react-router-dom";

export default function DayPlanComponent(){
    let { id } = useParams();
    let {date} = useParams();
    return (
<>
<h1>
<Link
className="nav-link"
to={ `/admin/camp/${id}/plan/${date}/regular` }
>
Regular Users
</Link>   

</h1>

<h1>

<Link
className="nav-link"
to={ `/admin/camp/${id}/plan/${date}/exceptional` }
>
Exceptional Users
</Link>   
</h1>
</>
        
    )
}