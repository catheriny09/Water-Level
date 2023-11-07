import React, {useState} from 'react';
import MonthYearPicker from 'react-month-year-picker';

function MonthPicker(props) {
let date = props.date;
let vis = props.vis;
let updateVisible = props.updateVis;



function pickedYear (year) {
  props.yearFun(year);
}

function pickedMonth (month) {
  updateVisible(false);
  props.monthFun(month);
}

  if (vis) {
return (
      <div id="monthDiv">
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> );
  } else {
    return (
      <div> </div>
    )
  }
}

export default MonthPicker;