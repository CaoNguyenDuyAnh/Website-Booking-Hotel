import "./header.css"
import {FaBed, FaCalendarDay, FaPersonBooth} from "react-icons/fa"
import {FaPlane} from "react-icons/fa"
import {FaFortAwesome} from "react-icons/fa"
import {FaCar} from "react-icons/fa"
import {FaAngleDown} from "react-icons/fa"
import {FaUser} from "react-icons/fa"
import { DateRange } from "react-date-range"
import { useState, useContext } from "react"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format }  from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContex"

const Header = ({type}) => {
    const [destination,setDestination] = useState("")
    const [openDate,setOpenDate] = useState(false)
    const [openOptions,setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult:1,
        children: 0,
        room: 1,
    })

    const navigate = useNavigate()
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const handleOption = (name, operation) => {
        setOptions(prev => {return{
            ...prev, [name] : operation === "i" ? options[name] +1 : options[name] -1,
        }
        
        })
    }

    const {dispatch} = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination,dates, options}});
        navigate("/hotels", {state: {destination,dates, options}})
    }
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <a href="/" className="headerListItem active">
                        <FaBed className="headerIcon"/>
                        <span>Lưu trú</span>
                    </a>
                    <a className="headerListItem">
                        <FaPlane className="headerIcon"/>
                        <span>Chuyến bay</span>
                    </a>
                    <a className="headerListItem">
                        <FaFortAwesome className="headerIcon"/>
                        <span>Điểm tham quan</span>
                    </a>
                    <a className="headerListItem">
                        <FaCar className="headerIcon"/>
                        <span>Thuê xe</span>
                    </a>
                </div>
                { type !== "list" &&<><h1 className="headerTitle">Tìm chỗ nghỉ tiếp theo</h1>
                <p className="headerDesc">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FaBed className="headerIconSearch"/>
                        <input type="text" placeholder="Bạn muốn đến đâu?" className="headerSearchInput" onChange={e=>setDestination(e.target.value)}/>
                    </div>
                    <div className="headerSearchItem">
                        <FaCalendarDay className="headerIconSearch"/>
                        <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} - ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                        { openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date"
                            minDate={new Date()}
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FaUser className="headerIconSearch"/>
                        <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} Người lớn - ${options.children} Trẻ em - ${options.room} Phòng`} <FaAngleDown/></span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Người lớn</span>
                                <div className="optionCounter">
                                    <button disabled= {options.adult <= 1} className="optionCounterBtn" onClick={() => handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterBtn" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Trẻ em</span>
                                <div className="optionCounter">
                                    <button disabled= {options.children <= 0}  className="optionCounterBtn" onClick={() => handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterBtn" onClick={() => handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Phòng</span>
                                <div className="optionCounter">
                                    <button disabled= {options.room <= 1}  className="optionCounterBtn " onClick={() => handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterBtn" onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtnSearch" onClick={handleSearch}>Tìm Kiếm</button>
                    </div>
                </div></>}
            </div>
        </div>
    )
}

export default Header