import "./hotel.css";
import Navbar from "../../component/navbar/navbar";
import Header from "../../component/header/header";
import EmailList from "../../component/emailList/emailList";
import Footer from "../../component/footer/footer";

import { FaArrowCircleLeft, FaArrowCircleRight, FaMapMarkerAlt, FaTimesCircle } from "react-icons/fa"
import { useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContex"

const Hotel = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const {data, loading, error} = useFetch(`/hotels/find/${id}`)
    const {dates} = useContext(SearchContext)

    const handleBooking = () => {
        
      }
    


    const handleOpen = (index) => {
        setSlideNumber(index);
        setOpen(true)
    }

    const handleMove = (direction) => {
        let newSlideNumber;
        if(direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        }else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNumber)
    }
    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? ("loading") : <div className="hotelContainer">
                {open && <div className="slider">
                    <FaTimesCircle className="close" onClick={()=>setOpen(false)}/>
                    
                    <FaArrowCircleLeft className="arrow" onClick={() => handleMove("l")}/>
                    <div className="sliderWrapper">
                        <img src={data.photo[slideNumber]} alt="" className="sliderImg" />
                    </div>
                    <FaArrowCircleRight className="arrow" onClick={() => handleMove("r")}/>
                </div>}
                <div className="hotelWrapper">
                    <button className="bookNow">Đặt ngay</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FaMapMarkerAlt />
                        <span>{data.address}</span>
                    </div>
                    <div className="hotelImages">
                        {data.photo?.map((photo, index) => (
                            <div className="hotelImgWrapper">
                                <img onClick={()=> handleOpen(index)} src={photo} alt="" className="hotelImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailText">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">{data.desc}</p>
                        </div>
                        <div className="hotelDetailPrice">
                            <h1>Hoàn hảo cho 3 đêm ở</h1>
                            <span>Nằm tại khu vực được đánh giá cao nhất ở {data.city}, khách sạn này có điểm vị trí xuất sắc 8,7</span>
                            <h2>
                                <b>{data.cheapestPrice}</b> (3 đêm)
                            </h2>
                            <button onClick={handleBooking}>Đặt ngay</button>
                        </div>
                    </div>
                </div>
                <EmailList />
                <Footer />
            </div>}

        </div>
    )
}

export default Hotel