import { Route, Routes, Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EpisodesTable from "./components/EpisodesTable";
import Episode from "./components/Episode";

function App() {
  return (
    <div className='App'>
      <Container>
        <Row>
          <Col xxl={{ span: 10, offset: 1 }} sm={12}>
            <Routes>
              <Route path='/' element={<EpisodesTable />} />
              <Route path='/episode/:id' element={<Episode />} />
              <Route path='*' element={<Navigate replace to='/' />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
