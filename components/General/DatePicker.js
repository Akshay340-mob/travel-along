
import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
 
const MyDatePicker =props=>{

    
    return (
      <DatePicker
        style={{width: 200}}
        date={props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => props.onselect(date)}
      />
    )
  
}
export default MyDatePicker