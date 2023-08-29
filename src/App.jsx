import './App.css'

import { useState, useEffect } from 'react'
import Coin from './components/Coin'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [loading, setLoading] = useState(false)
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("")

    async function fetchCoins() {
        const per_page = 50 // to get the only 50 crypto coins [ 1 to 250 as per api information]
        const vs_currency = "inr" // to set the price currency
        try {
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${per_page}&page=1&sparkline=false&locale=en`
            const response = await fetch(url)
            const data = await response.json()
            setCoins(data)
        } catch (error) {
            // console.log(error, "Error during fetch the data ")
            setCoins(null) // null will used to show the error
        }

    }

    useEffect(() => {
        setLoading(true)
        fetchCoins()
        setLoading(false)
        toast.info('Open website in Desktop Mode!')
    }, [])

    function clickHandler(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    // to apply the filter data
    let filterData = []
    if (coins === null) {
        filterData = null
    } else {
        filterData = coins.filter(coin =>
            coin.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    
    return (
        <div>
            <form className='' id="search">
                <input
                    name='search'
                    type='text'
                    className='search'
                    placeholder='Provide the coin name'
                    onKeyUp={clickHandler}
                />
            </form>

            <div className='container'>
                {filterData != null ? (
                    <table className='coins-table'>
                        <thead>
                            <tr className='head-tr'>
                                <th colSpan={2} className='coin-name'>Crypto Name</th>
                                <th>Symbol</th>
                                <th>Price ( Rs. )</th>
                                <th>Growth</th>
                                <th>Market Cap ( Rs. )</th>
                            </tr>
                        </thead>
                        <tbody>

                            {loading ? (
                                <>
                                    <div className='spinner'></div>
                                    <div>Data is loading....</div>
                                </>
                            ) : (
                                <>

                                    {filterData.map((coin) => {
                                        return <Coin
                                            key={coin.id}
                                            name={coin.name}
                                            symbol={coin.symbol}
                                            image={coin.image}
                                            current_price={coin.current_price}
                                            market_cap={coin.market_cap}
                                            price_change_percentage_24h={coin.price_change_percentage_24h}
                                        />
                                    })}

                                </>
                            )}
                        </tbody>

                    </table>
                ) : (
                    <div className='error-container'>
                        <p>Error!</p>
                        <p>Data is not fetched</p>
                    </div>
                )}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </div>
    )
}

export default App
