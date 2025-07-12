import Loader from "./components/Loader/Loader";

function App() {
  return (
    <>
      <div className="app">
        <h1 className="weather-title">Погодное приложение</h1>
        <div className="location-controls">
          <button>Севастополь</button>
          <button>Моё местоположение</button>
        </div>
      </div>
    </>
  );
}

export default App;
