// import { useState } from "react";


// function App() {
//   const [editStudent, setEditStudent] = useState();
//   const [students, setStudents] = useState([
//     { name: "atif", id: "01" },
//     { name: "awais", id: "02" },
//   ]);

//   const changeName = (e) => {
//     setEditStudent({ ...editStudent, name: e.target.value });
//   };

// const updateStudent= () => {
//   const allStudents = students.map((s) => { return s.id === editStudent.id ? editStudent : s })
//   setStudents(allStudents)
//   setEditStudent()
 
  
// }

//   return (
//     <div>
//       {editStudent !== undefined ? (
//         <div>
//          {editStudent.id} <input type="text" onChange={changeName} value={editStudent.name} />
//          <button onClick={updateStudent}>update</button>
//         </div>
//       ) : null}
//       {students.map((s) => {
//         return (
//           <div>
//             <h1>
//               {s.name} , {s.id}
//             </h1>
//             <button onClick={() => setEditStudent(s)}>edit</button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// export default App;

// import StudentCard from "./components/studentCard";
// function App() {
//     return <StudentCard/>;

    
// }
// export default App;

//     import React from "react";
//     import Test from "./Components/Test";

// function App() {
//   return (
//     <div>
//         <Test/>
//     </div>
//   );
    
// }

// export defaulf App;


import React from "react";
import { createRoot } from "react-dom/client";
import Gym from "./Components/Gym";
import "./App.css";

function App() {
  return <Gym />;
}

export default App;
