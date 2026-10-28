
    
import {useState} from "react";
function StudentCard() {
    const[students, setStudents] = useState([
        {name: "atif", id: "01"},
        {name: "aslam", id: "02"},
    ]);
    return (
        <div>
            {students.map((student) => (
                <p key={student.id}>
                    {student.name}</p>
            ))}
        </div>
    );
}
export default StudentCard;