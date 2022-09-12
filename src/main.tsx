import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import 'bootstrap';
import '../src/style/styles.scss';
import 'web-animations-js';
import { RandomNamePicker } from './routes/RandomNamePIcker';
import { SpinTheWheel } from './routes/SpinTheWheel';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="random-name-picker" element={<RandomNamePicker />} />
        <Route path="spin-the-wheel" element={<SpinTheWheel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
