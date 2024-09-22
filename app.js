const { createContext, useState, useContext } = React;

    const ThemeContext = createContext({
      couleurPrincipale: 'blue',
      police: 'Arial',
      setTheme: () => {}
    });

    const ThemeProvider = ({ children }) => {
      const [theme, setTheme] = useState({
        couleurPrincipale: 'blue',
        police: 'Arial'
      });

      return (
        <ThemeContext.Provider value={{ ...theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };


    const Header = () => {
      const { couleurPrincipale, police } = useContext(ThemeContext);
      return (
        <header style={{ color: couleurPrincipale, fontFamily: police }}>
          <h1>Thème : {couleurPrincipale} - Police : {police}</h1>
        </header>
      );
    };

    const ThemeChanger = () => {
      const { setTheme } = useContext(ThemeContext);
      const [newCouleur, setNewCouleur] = useState('');
      const [newPolice, setNewPolice] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        setTheme({ couleurPrincipale: newCouleur, police: newPolice });
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nouvelle Couleur : </label>
            <input
              type="text"
              value={newCouleur}
              onChange={(e) => setNewCouleur(e.target.value)}
            />
          </div>
          <div>
            <label>Nouvelle Police : </label>
            <input
              type="text"
              value={newPolice}
              onChange={(e) => setNewPolice(e.target.value)}
            />
          </div>
          <button type="submit">Changer le thème</button>
        </form>
      );
    };

    const App = () => {
      return (
        <ThemeProvider>
          <div>
            <Header />
            <ThemeChanger />
          </div>
        </ThemeProvider>
      );
    };

    ReactDOM.render(<App />, document.getElementById('root'));