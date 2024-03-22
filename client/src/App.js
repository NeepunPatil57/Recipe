import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Pages/Home'
import RecipePage from './Components/Pages/recipe'
import Specific from './Components/Pages/specific'
import Saved from './Components/Pages/saved'

export default function App () {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/recipe_details/:id" element={<Specific />} />
      </Routes>
    </Router>
  )
}

