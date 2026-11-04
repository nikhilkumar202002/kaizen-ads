import React from 'react'
import Header from './components/layout/Header'
import Hero from './components/home/Hero'

const App = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App