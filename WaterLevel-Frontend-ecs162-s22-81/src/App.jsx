import React, { useState, useEffect } from 'react';
import './App.css';
import useAsyncFetch from './useAsyncFetch'; 
import MonthPicker from './MonthPicker';
import MonthYearPicker from 'react-month-year-picker';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function App() {

  const [seeButton, setSeeButton] = useState("See more");

  function updateButton(){
    setSeeButton(prevCount =>
      prevCount == "See more" ? "See less" : "See more");
  }
  
  return (
    <div className = "container">
      <header>
        <h1>Water Storage in </h1>
        <h2 id = "blank">  </h2>
        <h1>California Reservoirs</h1>
      </header>
      <section id = "first">
        <div className = "textDiv">
          <p className = "bodyText">
      California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
        </p>
        <p className = "bodyText">
California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
        </p>
          <button type = "button" id = "more" onClick= {updateButton}>{seeButton}</button>
      </div>
      <div className = "imgDiv">
        <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
"/>
        <figcaption>Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlantic article Dramatic Photos of California's Historic Drought.     
        </figcaption>
      </div>
    </section>

    < SecondSection 
        buttonText = {seeButton}/>
    
  </div>
  );
}

function SecondSection({buttonText}){
   const [visible, setVisible] = useState(false);

  function dateClicked(){
    setVisible(true);
    console.log(visible);
  }
 
  const [date, setDate] = useState({month: 4, year: 2022 });
  
  function yearChange(newYear) {
      let m = date.month;
      setDate({year: newYear, month: m });
    }

  function monthChange(newMonth){
      let y = date.year;
      setDate({month: newMonth, year: y});
    }

  function numbertoString(month){
    switch(month){
      case 1:
        return "January"
      case 2:
        return "February"
      case 3:
        return "March"
      case 4:
        return "April"
      case 5:
        return "May"
      case 6:
        return "June"
      case 7:
        return "July"
      case 8:
        return "August"
      case 9:
        return "September"
      case 10:
        return "October"
      case 11:
        return "Novemeber"
      case 12:
        return "December"
    }
      
  }

  
  if(buttonText == "See less"){
    return(
      <section id = "second">
        <ResevoirData 
          year =  {date.year}
          month =  {date.month}
          />
        <div className = "textAndCalendar">
            <p className = "bodyText" id ="bottomText">
Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>
          <br></br>
          <p className = "bodyText" id = "monthPicker">Change Month:
          </p>
          <ul className = "monthYearBox" onClick = {dateClicked} > {numbertoString(date.month)} {date.year} </ul>
          <MonthPicker     
          date = {date}
          yearFun = {yearChange}
          monthFun = {monthChange}
          vis = {visible}
          updateVis = {setVisible}
          /> 
         
       </div>
     </section>
    )
  }
  else{
    return(
      <div> </div>
    )
  }
}

const ResevoirChart = React.memo(function ResevoirChart(props) {
  const nicknames = new Map();
  nicknames.set(0, 'Shasta');
  nicknames.set(1, 'Oroville');
  nicknames.set(2, 'Trinity Lake');
  nicknames.set(3, 'New Melones');
  nicknames.set(4, 'San Luis');
  nicknames.set(5, 'Don Pedro');
  nicknames.set(6, 'Berryessa');

  if (props.resevoirs) {
    let n = props.resevoirs.length;
    console.log(props.resevoirs);

    let currentWater = {data: [], backgroundColor: ["rgb(66,145,152)"], categoryPercentage: 0.5}
    let maxWater = {data: [4552000, 3537577, 2447650, 2400000, 
                          2041000, 2030000, 1602000], backgroundColor: ["rgb(120,199,227)"], categoryPercentage: 0.5}
    
    let labels = [];
    for (let i=0; i<n; i++) {
      currentWater.data.push(props.resevoirs[i].value);
      labels.push(nicknames.get(i));
    }


    let userData = {};
    userData.labels = labels;
    userData.datasets = [currentWater, maxWater] ;

    
    let options = {
      plugins: {
        title: {
          display: false,
        },
        legend: {
            display: false
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    };
    
    return (
      <div id="chart-container">
        <Bar options={options} data={userData} />
      </div>
    )
  }
});

const ResevoirData = React.memo(function ResevoirData(props) {
  const [resevoirs, setResevoirs] = useState([]);
  
  console.log("month is: ", props.month);
  console.log("year is: ", props.year);

  let params = {
    method: 'post', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"month": props.month, "year": props.year}) };

  console.log("date is: ", params.body);


  
  useAsyncFetch("/query/getWaterData", params, thenFun, catchFun);
  
  function thenFun (result) {
    console.log("result is: ", result)
    setResevoirs(result);
  }

  function catchFun (error) {
    console.log(error);
  }

  if (resevoirs) {
    return (
      <main>
         <ResevoirChart resevoirs={resevoirs}> </ResevoirChart>
      </main>)
  } 
  else {
    return (<p>
      loading...
    </p>);
  }
});

export default App;