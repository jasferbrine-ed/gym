import {useState} from "react";
function Mycard() {
    const[names,setNames]=useState(["ali","ahmad"])
    return(
    <div>
        <h1>{names(1)}</h1>
   </div>
    )
}
export default Mycard;