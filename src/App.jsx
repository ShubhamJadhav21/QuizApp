import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Student from './Components/Student/Student';
import Admin from './Components/Student/Admin/Admin';
import StartQuiz from './Components/StartQuiz/StartQuiz';
import Addquestions from './Components/Addquestions/Addquestions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='student' element={<Student/>}/>
        <Route path='admin' element={<Admin/>}/>
        <Route path='startquiz' element={<StartQuiz/>}/>
        <Route path='addquestions' element={<Addquestions/>}/>
      </Routes>
    </BrowserRouter>
  );
}
