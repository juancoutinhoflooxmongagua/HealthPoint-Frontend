import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Nav from '../views/Components/Nav';
import Home from '../views/Main/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav></Nav>
      </header>

      <Home></Home>
    </div>
  );
}

export default App;
