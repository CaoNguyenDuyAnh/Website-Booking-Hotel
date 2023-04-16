import "./NearList.css";
import useFetch from "../../hooks/useFetch"
import React, { useEffect, useState } from 'react'
const wards = require('../../data.json')

const lineIntersectSegment = (line, segment) => {
    const [lineStart, lineEnd] = line
    const [segmentStart, segmentEnd] = segment
    const a = (lineEnd.lat - lineStart.lat) / (lineEnd.long - lineStart.long)
    const b = lineEnd.lat - (a * lineEnd.long)

    const startPointAbove = segmentStart.lat > a * segmentStart.long + b
    const endPointAbove = segmentEnd.lat > a * segmentEnd.long + b
    return startPointAbove != endPointAbove
}

const segmentIntersect = (segment1, segment2) => {
    return lineIntersectSegment(segment1, segment2) &&
        lineIntersectSegment(segment2, segment1)
}

const positionInsidePolygon = (position, polygon) => {
    const checkSegment = [{ lat: 0, long: 0 }, position]
    let count = 0
    for (let i = 0; i < polygon.length - 1; i++) {
        const segment = [{ long: polygon[i][0], lat: polygon[i][1] },
        { long: polygon[i + 1][0], lat: polygon[i + 1][1] }]
        if (segmentIntersect(checkSegment, segment)) {
            count++
        }
    }
    return count % 2 != 0
}

const positionInsideBbox = (position, bbox) => {
    return position.lat >= bbox.minLat &&
        position.lat <= bbox.maxLat &&
        position.long >= bbox.minLong &&
        position.long <= bbox.maxLong
}



const positionInsideWard = (position, ward) => {
    return ward.polygons.some(polygon => positionInsidePolygon(position, polygon))
}

const NearList = () => {
    const [ward, setWard] = useState(null)
    const getWard = (position) => {
        let posibleWards = wards.filter(ward => positionInsideBbox(position, ward.bbox))
        if (posibleWards.length == 1) {
            setWard(posibleWards[0])
            return;
        }
        let findWard = posibleWards.find(posibleWard => positionInsideWard(position, posibleWard))
        setWard(findWard)
    }
    const [filteredHotels, setFilteredHotels] = useState([]);

    const filterHotels = () => {
        const filtered = data.filter(item => item.city == ward.district);
        setFilteredHotels(filtered);
    }

    useEffect(() => {
        filterHotels();
    }, [ward]);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                getWard({ lat, long })
            });
        }
    }, [])
    const { data, loading, error } = useFetch("/hotels")
    return (
        <div className="nList">
            <a className="nListItem">
                <div className="nListTitles">
                    {filteredHotels.map(item => (
                        <div key={item.id}>
                            <div className="searchItem">
                                <img
                                    src={item.photo}
                                    alt=""
                                    className="siImg"
                                />
                                <div className="siDesc">
                                    <h1 className="siTitle">{item.name}</h1>
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
                        </div>
                    ))}

                </div>
            </a>
        </div>
    )
}

export default NearList