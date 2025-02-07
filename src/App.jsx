
import "./index.css"

import searchIcon from "./assets/search.png"
import clearIcon from "./assets/clear.png"
import cloudIcon from "./assets/cloud.png"
import drizzleIcon from "./assets/drizzle.png"
import rainIcon from "./assets/rain.png"
import windIcon from "./assets/download (10).png"
import snowIcon from "./assets/snow.png"
import humidityIcon from "./assets/download (8).png"
import { useEffect, useState } from "react"



//Weather Details component It directly return when call
function WeatherDetails({icon,temp,city,country,lat,log,humidity,wind}){
    return(
        <>
        <div className="image">
            <img src={icon} alt="Image" />
        </div>
        <div className="temp">{temp}°C</div>
        <div className="location">{city}</div>   
        <div className="country">{country}</div>

    <div className="cord">
         <div>
            <span className="lat">Lattitude </span>
            <span>{lat}</span>
         </div>

         <div>
            <span className="log">Longitude </span>
            <span>{log}</span>
         </div>
    </div>   

  <div className="data-container">
    <div className="element">
        <img src={humidityIcon} alt="humidity" className="icon"/>
        <div className="humidity-percentage">{humidity}%</div>
        <div className="text">Humidity</div>
    </div>

  <div className="element">
    <img src={windIcon} alt="wind" className="icon"/>
    <div className="wind-percent">{wind}km/h</div>
    <div className="text">Wind Speed</div>

  </div>
  </div>


        </>
    )
}




//Main
function App(){

    const [text,setText]=useState("Chennai")

    let api_key="Enter Your Key"

    const [icon,setIcon]=useState(clearIcon)
    const [temp,setTemp]=useState(0)
    const [city,setCity]=useState("")
    const [country,setCountry]=useState("")
    const [lat,setLat]=useState(0)
    const [log,setLog]=useState(0)
    const [humidity,setHumidity]=useState(0)
    const [wind,setWind]=useState(0)

    // if cityNotFound is true entered city is wrong
    const [cityNotFound,setCityNotFound]=useState(false)
    // if loading is true data is fetching
    const [loading,setLoading]=useState(false)

   const [error,setError]=useState(null)

    const weatherIconMap={
        "01d.png":clearIcon,
        "01n.png":clearIcon,
        "02d.png":cloudIcon,
        "02n.png":cloudIcon,
        "03d.png":drizzleIcon,
        "03n.png":drizzleIcon,
        "04d.png":drizzleIcon,
        "04n.png":drizzleIcon, 
        "09d.png":rainIcon,
        "09n.png":rainIcon,
        "010d.png":rainIcon,
        "010n.png":rainIcon,
        "013d.png":snowIcon,
        "013n.png":snowIcon,
    };

    async function search() {
        // workfine if i Comment setloading
        setLoading(true)

        let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
        
        try{
            //Fetch Return Readable Stream Date we store in res
            let res= await fetch(url);
            //Json covert readable stream data to Json format 
            let data=await res.json();

            if(data.cod==="404"){
                console.log("City Not Found")
                setCityNotFound(true)
                setLoading(false)
                return;
            }

            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setTemp(Math.floor(data.main.temp))
            setCity(data.name)
            setCountry(data.sys.country)
            setLog(data.coord.lon)
            setLat(data.coord.lat)
             

            const weatherIconCode=data.weather[0].icon;
            setIcon(weatherIconMap[weatherIconCode]||clearIcon)
            setCityNotFound(false)
         } 
        catch(error){
         console.log("An Error Occured ",error)
         //set error message to new state Variable
         setError("An Error Occured while Fetching Data ")
        }
        finally{
            setLoading(false)
        }
    }

    function handleCity(e){
        setText(e.target.value)
    }
    function handleKeyDown(e){
        if(e.key==="Enter"){
            search();

        }
    }

    useEffect(function(){
        search()
    },[])

    return (
        <>
        <div className="container">
            <div className="input-container">
                <input onKeyDown={handleKeyDown} value={text} onChange={handleCity} type="text" className="cityInput" placeholder="Search City" />
                <div className="search-icon">
                    <img onClick={()=>{search()}} src={searchIcon} alt="Search" />
                </div>
            </div>

    
      {/* It Display Loadind when It true only  */}
      {loading &&<div className="loading-message">Loading...</div>}
      
      {/* It Display Error Message when It true only  */}
      {error &&<div className="error-message">{error}</div>}

      {/* It Display CityNotFound when It true only  */}
      {cityNotFound &&<div className="city-not-found">City Not Found</div>}
            

     {/* It is opposite if loading and cityNotFound false It display weather Detail */}
    {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} 
    lat={lat} log={log} humidity={humidity} wind={wind}    
      />}


        </div>  
        </>

    )
}
export default App
