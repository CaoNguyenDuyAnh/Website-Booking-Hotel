import "./searchItem.css"

const SearchItem = ({item}) => {
    return (
        <div className="searchItem">
            <img 
                src={item.photo[1]}
                alt="" 
                className="siImg"
            /> 
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}m from center</span>
                <span className="siFeatures"> {item.desc}</span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Rất tốt</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailText">
                    <span className="siPrice"> ${item.cheapestPrice}</span>
                    <a href={`/hotels/${item._id}`}>
                   <button className="siCheckBtn">Xem chỗ trống</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchItem