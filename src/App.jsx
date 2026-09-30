import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom'; // 1. Ubah BrowserRouter menjadi HashRouter
import { ThemeProvider } from 'styled-components';
import useDarkMode from './hooks/useDarkMode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';

function App() {
  const darkMode = useDarkMode(true);

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
          {/* 2. Ganti elemen BrowserRouter menjadi HashRouter */}
          <HashRouter>
            <MainApp />
          </HashRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;