import { useEffect } from 'react';
import { AppRoutes } from './routes';

function App() {
  useEffect(() => {
    const randomImageUrl = 'https://picsum.photos/1920/1080';
    
    document.body.style.backgroundImage = `url(${randomImageUrl})`;

  }, []);

  return <AppRoutes />;
}

export default App;