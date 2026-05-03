import { useState } from 'react';
import './App.css';

import Header from './Components/Header';
import RegisterForm from './Components/RegisterForm';
import StatsBar from './Components/StatsBar';
import StudentTable from './Components/StudentTable';
import Footer from './Components/Footer';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Aman', score: 78 },
  { id: 2, name: 'Roman', score: 45 },
  { id: 3, name: 'Jonny', score: 98 },
  { id: 4, name: 'Rambir', score: 32 },
];

let nextId = 5;

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  const handleAdd = ({ name, score }) => {
    const newStudent = { id: nextId++, name, score };
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleUpdate = (id, newScore) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore } : s))
    );
  };

  return (
    <div className="app">
      <Header /><br />
      <RegisterForm onAdd={handleAdd} /><br />
      <StatsBar students={students} /><br /><br />
      <StudentTable students={students} onUpdate={handleUpdate} />
      <Footer />
    </div>
  );
}

export default App;
