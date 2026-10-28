//  import { useState } from "react";
//  import "./Students.css";
//  function Students() {
//     const [search, setSearch] = useState("");
//     const [std] = useState([
//         {
//             name: "ali",
//             rollNumber: "01",
//             about: "strings cannot be changed after creation.",
//         },
//         {
//             name: "awais",
//             rollNumber: "02",
//             about: "a string is acollection of characters.",
//         },
//         {
//             name: "asif",
//             rollNumber: "02",
//              about: "string indexing start at 0.",
//         },
//         {
//         })
//         const filtered = std.filter((f) =>
//             f.name.toLowerCase().includes(search.toLowerCase()) ||
//             f.name.toLowerCase().includes(search.toLowerCase()) 
// );
// return (
//     <div className="main">
//         <h1>Students <span>{search}</span></h1>

//         <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         />

        
//         <p>Total filtered: {filtered.length}<p/>

//         <div className="list">
//             {filtered.length > 0? (
//                 filtered.map((s, i) => (
//                     <div className="card" key={i}>
//                         </div>
//                         <h3>Name: {s.name}</h3>
//                         <span>Roll #: {s.rollNumber}</span>
//                         <p>{s.about}</p>
//                         </div>
//                         </div>
//                 ))
//             ) : (
//                 <h3>No student found </h3>
//             )}
//             </div>
//             </div>
//             );
//             }
//             export default Students;
