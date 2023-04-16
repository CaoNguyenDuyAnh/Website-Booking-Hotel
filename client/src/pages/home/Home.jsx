import React, { useEffect, useState } from 'react'
import Navbar from "../../component/navbar/navbar";
import Header from "../../component/header/header";
import "./home.css";
import Featured from "../../component/featured/featured";
import PropertyList from "../../component/propertyList/propertyList";
import FeaturedDiscover from "../../component/featuredDiscover/featuredDiscover";
import EmailList from "../../component/emailList/emailList";
import Footer from "../../component/footer/footer";
import NearList from '../../component/nearList/NearList';

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
            lineIntersectSegment(segment2,segment1)
}

const positionInsidePolygon = (position, polygon) => {
    const checkSegment = [{lat:0, long:0}, position]
    let count = 0
    for(let i = 0; i < polygon.length - 1; i++) {
        const segment = [{long: polygon[i][0], lat: polygon[i][1]}, 
                        {long: polygon[i + 1][0], lat: polygon[i + 1][1]}]
        if(segmentIntersect(checkSegment,segment)) {
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
    return ward.polygons.some(polygon =>  positionInsidePolygon(position, polygon))
}

const Home = () => {
    const[ward, setWard] = useState(null)
    const getWard = (position) => {
        let posibleWards = wards.filter(ward => positionInsideBbox(position, ward.bbox))
        if(posibleWards.length == 1 ) {
            setWard(posibleWards[0])
            return;
        }
        let findWard = posibleWards.find(posibleWard => positionInsideWard(position, posibleWard))
        setWard(findWard)
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                getWard({lat,long})
                console.log(long, lat)
            });
        }
    }, [])
    return (
        <div>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <Featured/>
                <h1>Vị trí hiện tại của bạn là : {ward && ward.name + ' ' + ward.district + ' ' + ward.provice}</h1>
                <h2>Các khách sạn gần bạn</h2>
                <NearList/>
                <h1 className="homeTitle">Tìm theo loại chỗ nghỉ</h1>
                <PropertyList/>
                <h1 className="homeTitle">Khám phá Việt Nam <p className="homeDesc">Các điểm đến phổ biến này có nhiều điều chờ đón bạn</p></h1>
                <FeaturedDiscover/>
                <EmailList/>
                <Footer/>

            </div>
        </div>
    )
}

export default Home