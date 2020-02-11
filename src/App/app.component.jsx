import React from "react";
import { Provider } from "react-redux";
import { monthlyData } from "../helpers/monthlyData";
import { buildStore } from "../redux";
import { appReducer } from "./app.reducer";
import styled from "styled-components";
import AppDatepicker from "./AppDatepicker/";
import AppDatepickerControls from "./AppDatepickerControls/";

const store = buildStore(appReducer);

class App extends React.Component {
  state = { currentMonth: 1, monthInfo: {}, firstDay: 0, lastDay: 0 };

  componentDidMount() {
    const currentMonth = this.getDate().getMonth();
    this.determineFirstOfMonth();
    this.determineLastDayOfMonth();
    this.setCurrentMonth(currentMonth);
  }

  determineFirstOfMonth = e => {
    let date = this.getDate();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    this.setState({ firstDay });
  };

  determineLastDayOfMonth = () => {
    let date = this.getDate();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    this.setState({ lastDay, currentDate: date });
  };

  getDate = () => {
    return new Date();
  };

  setCurrentMonth = e => {
    this.setState({ currentMonth: e, monthInfo: monthlyData[e] });
  };

  incFirstLastDays = e => {
    let d = this.getDate();
    let first = new Date(
      this.getDate().getFullYear(),
      e ? e : this.state.currentMonth + 1,
      1
    ).getDay();
    this.setState(s => {
      return {
        firstDay: first,
        selectedDay: false
      };
    });
  };

  decFirstLastDays = e => {
    let d = this.getDate();
    let first = new Date(
      this.getDate().getFullYear(),
      e ? e : this.state.currentMonth - 1,
      1
    ).getDay();
    this.setState(s => {
      return {
        firstDay: first,
        selectedDay: false
      };
    });
  };

  incMonth = () => {
    if (this.state.currentMonth === 11) {
      this.setCurrentMonth(0);
      this.incFirstLastDays(0);
    } else {
      this.setCurrentMonth(this.state.currentMonth + 1);
      this.incFirstLastDays();
    }
  };

  decMonth = () => {
    if (this.state.currentMonth === 0) {
      this.setCurrentMonth(11);
      this.decFirstLastDays(11);
    } else {
      this.setCurrentMonth(this.state.currentMonth - 1);
      this.decFirstLastDays();
    }
  };

  createCalendar = () => {
    let days = new Array(this.state.monthInfo.days).fill({ real: true });
    for (let s of new Array(this.state.firstDay)) {
      days.unshift({ real: false });
    }
    return days.map((s, i) => {
      const theThe = i + 1 - this.state.firstDay;
      return (
        <SingleDay
          onClick={() => (s.real ? this.setDateRange(theThe) : null)}
          backgroundColor={
            this.state.secondDay
              ? theThe <= this.state.secondDay &&
                theThe >= this.state.selectedDay
                ? "lightGray"
                : "white"
              : this.state.selectedDay === theThe
              ? "lightgray"
              : "white"
          }
        >
          {s.real ? <DayText>{theThe}</DayText> : null}
        </SingleDay>
      );
    });
  };

  setDateRange = e => {
    console.log(e);
    console.log(this.state.selectedDay);
    if (this.state.selectedDay) {
      if (e > this.state.selectedDay) {
        this.setState({ secondDay: e });
      } else {
        this.setState({ selectedDay: e, secondDay: false });
      }
    } else {
      this.setState({ selectedDay: e });
    }
  };

  render() {
    return (
      <CalendarWrap>
        <MonthPickerWrap>
          <MonthChangeButtonWrap onClick={this.decMonth}>
            &#60;
          </MonthChangeButtonWrap>
          <MonthDisplayWrap>{this.state.monthInfo.name}</MonthDisplayWrap>
          <MonthChangeButtonWrap onClick={this.incMonth}>
            &#62;
          </MonthChangeButtonWrap>
        </MonthPickerWrap>
        <CalendarDaysWrap>
          {this.state.monthInfo.name ? this.createCalendar() : null}
        </CalendarDaysWrap>
        <TwoDayWrap>
          {this.state.selectedDay ? (
            <SelectedDayWrap>
              {this.state.monthInfo.name} {this.state.selectedDay}
            </SelectedDayWrap>
          ) : null}
          {this.state.secondDay ? <SelectedDayWrap> - </SelectedDayWrap> : null}
          {this.state.secondDay ? (
            <SelectedDayWrap>
              {this.state.monthInfo.name} {this.state.secondDay}
            </SelectedDayWrap>
          ) : null}
        </TwoDayWrap>
      </CalendarWrap>
    );
  }
}

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;
const MonthPickerWrap = styled.div`
  display: flex;
`;
const MonthChangeButtonWrap = styled.div`
  display: flex;
  width: 25px;
  height: 25px
  
  &:hover {
    cursor: pointer;
  }
`;
const MonthDisplayWrap = styled.div`
  display: flex;
  justify-content: center;
  min-width: 150px;
`;

const CalendarDaysWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  max-width: 600px;
  min-width: 200px;
`;

const SingleDay = styled.div`
  width: 14.2%;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
`;

const DayText = styled.h3``;

const SelectedDayWrap = styled.div``;
const TwoDayWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default App;
