import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 style={{ fontSize: 62 }}>Lucky Draw Tools</h1>
        <div className="text-center">
          <Link to="/random-name-picker">Random Name Picker</Link> {' '} |{' '}
          <Link to="/spin-the-wheel">Spin The Wheel</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
