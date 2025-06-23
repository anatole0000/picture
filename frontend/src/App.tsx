// src/App.tsx
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';
import Header from './pages/Header';

function AppContent() {
  const elements = useRoutes(routes);

  return (
    <>
      <Header />
      {elements}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
