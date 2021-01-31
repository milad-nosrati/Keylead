import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    const todayDate= new Date();
    this.state = {
      selectedDay: {day: todayDate.getDate(),
                    month: todayDate.getMonth()+1 , 
                    year:todayDate.getFullYear()}
    };
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.passDataTOParent = this.passDataTOParent.bind(this);
  }
    passDataTOParent = () =>{
      this.props.selectedDate(this.state.selectedDay);
    }

    handleSelectDay=(date)=>{
      this.setState({
        selectedDay: date
      }, this.passDataTOParent);
    };

  // render regular HTML input element
  renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="Due Date"
      value={this.state.selectedDay ? ` ${this.state.selectedDay.day}/${this.state.selectedDay.month}/${this.state.selectedDay.year}` : ''}
      style={{
        textAlign: 'center',
        fontSize: '0.8rem',
        border: '0 solid transparent',
        borderRadius: '5px',
        color: 'var(--color-grey-dark-secondary',
        outline: 'none',
        backgroundColor: 'transparent',
        fontWeight: 400,
      }}
    />
  )
render(){
  return (
    <DatePicker
      onChange={(date) => this.handleSelectDay(date)}
      renderInput={this.renderCustomInput} // render a custom input
      shouldHighlightWeekends
      dateFormat="dd/MM/yyyy"
      className=" datepicker-input"
    />
  );
}
  
};

export default Datepicker;