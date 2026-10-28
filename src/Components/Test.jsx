import React, { useState } from "react";

function Test() {
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [rollno, setRollno] = useState("");

  const [student, setStudent] = useState([
    { id: 1, name: "haider", rollNo: "505797", book: "math" },
    { id: 2, name: "rafey", rollNo: "505890", book: "science" },
    { id: 3, name: "ali", rollNo: "505798", book: "english" },
  ]);

  const [search, setSearch] = useState("");

  const addStudent = () => {
    if (!name || !rollno || !book) return;
    const newStudent = {
      id: student.length + 1,
      name: name,
      rollNo: rollno,
      book: book,
    };
    setStudent([...student, newStudent]);
    setName("");
    setRollno("");
    setBook("");
  };

  const filteredStudents = student.filter((st) =>
    st.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search student by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Roll No"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <h2>Student List</h2>
      <ul>
        {filteredStudents.map((st) => (
          <li key={st.id}>
            {st.name} (Roll: {st.rollNo}) - Book: {st.book}
          </li>
        ))}
      </ul>

      <h2>Books List</h2>
      <ul>
        {student.map((st) => (
          <li key={st.id}>{st.book}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;