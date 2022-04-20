import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [listOfCoins, setListOfCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("https://api.coinstats.app/public/v1/coins?skip=0&")
            .then((response) => {
                setListOfCoins(response.data.coins);
            });
    }, []);
    const filteredCoins = listOfCoins.filter((coin) => {
        return coin.name.toLowerCase().includes(search);
    });
    return (
        <div className="App">
            <h1 className="title">Tracking Crypto Currency</h1>
            <div className="cryptoHeader">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                />
            </div>
            <div className="cryptoDisplay">
                {filteredCoins.splice(0, 5).map((coin) => {
                    return (
                        <div className="coin">
                            <h1>
                                {coin.name} ({coin.symbol})
                            </h1>
                            <h2>Price: ${coin.price}</h2>
                            <img src={coin.icon} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
