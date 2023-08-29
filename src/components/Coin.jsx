function Coin( { name , symbol , image , current_price , market_cap ,price_change_percentage_24h } ){
    
    return(
        <tr>
            <td>
                <img src={`${image}`} alt="icon"/>
            </td>
            <td>{name}</td>
            <td className="coin-symbol">{symbol}</td>
            <td>{current_price}</td>
            <td style={ 
                price_change_percentage_24h > 0 ? {color: 'green'} : {color : 'red'}
            }>
                { price_change_percentage_24h.toFixed(2) }{"%"}
            </td>
            <td>{market_cap}</td>
        </tr>
    )
}

export default Coin;