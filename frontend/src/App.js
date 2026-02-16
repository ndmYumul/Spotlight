import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailScreen from './screens/DetailScreen';

function App() {
  return (
    <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/building/:id' element={<DetailScreen />} />
            </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
