import React from "react";
import { connect } from "react-redux";
import { monthlyData } from "../helpers/monthlyData";
import "./Peterson.css";

import styled from "styled-components";

class App extends React.Component {
  state = {
    currentMonth: false,
    monthInfo: {},
    firstDay: 0,
    lastDay: 0,
    currentYear: false,
    selectedDay: false,
    secondDay: false
  };

  componentDidMount() {
    // this.determineFirstOfMonth();
    this.determineLastDayOfMonth();
  }

  reduxUpdate = () => {
    this.props.dispatch({
      type: "COOL_UPDATE",
      whatever: new Date()
    });
  };

  determineFirstOfMonth = () => {
    let date = this.getDate();
    let firstDay = new Date(
      this.state.currentYear,
      date.getMonth(),
      1
    ).getDay();
    this.setState({ firstDay });
  };

  determineLastDayOfMonth = () => {
    let date = this.getDate();
    let lastDay = new Date(
      this.state.currentYear,
      date.getMonth() + 1,
      0
    ).getDay();
    this.setState({ lastDay, currentDate: date });
  };

  getDate = () => {
    return new Date();
  };

  handleYearChange = e => {
    this.setState({ currentYear: parseInt(e.target.value) }, this.reduxUpdate);
  };

  setCurrentMonth = e => {
    const value = e.target ? parseInt(e.target.value) : e;
    let first = new Date(this.state.currentYear, value, 1).getDay();
    this.setState(
      {
        currentMonth: value,
        monthInfo: monthlyData[value],
        firstDay: first
      },
      this.reduxUpdate
    );
  };

  incFirstLastDays = e => {
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
          onDoubleClick={() =>
            this.setState({ selectedDay: false, secondDay: false })
          }
          shifter={s.real ? "brightness(90%)" : null}
          pointer={s.real ? "pointer" : null}
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
    if (e === this.state.selectedDay) {
      this.setState({ selectedDay: false, secondDay: false }, this.reduxUpdate);
    } else if (this.state.selectedDay) {
      if (e > this.state.selectedDay) {
        this.setState({ secondDay: e }, this.reduxUpdate);
      } else {
        this.setState({ selectedDay: e, secondDay: false }, this.reduxUpdate);
      }
    } else {
      this.setState({ selectedDay: e }, this.reduxUpdate);
    }
  };

  displayReduxInformation = () => {
    var today = this.props.information;
    const ampm = today.getHours >= 12 ? "pm" : "am";
    return (
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      ampm
    );
  };

  render() {
    return (
      <CalendarWrap>
        <h1>Mr. Peterson's Incredible Date Picker!!</h1>
        <YearPicker>
          <select
            className="petersonPickers"
            name="Year Selector"
            onChange={this.handleYearChange}
          >
            {new Array(30).fill("").map((s, i) => {
              return <option value={i + 2000}>{i + 2000}</option>;
            })}
          </select>
        </YearPicker>
        {this.state.currentYear ? (
          <MonthPickerWrap>
            {/* <MonthChangeButtonWrap onClick={this.decMonth}>
              &#60;
            </MonthChangeButtonWrap> */}
            {/* <MonthDisplayWrap>{this.state.monthInfo.name}</MonthDisplayWrap> */}
            <MonthDisplayWrap>
              <select
                className="petersonPickers"
                name="Year Selector"
                onChange={this.setCurrentMonth}
              >
                {monthlyData.map((s, i) => {
                  return <option value={i}>{s.name}</option>;
                })}
              </select>
            </MonthDisplayWrap>
            {/* <MonthChangeButtonWrap onClick={this.incMonth}>
              &#62;
            </MonthChangeButtonWrap> */}
          </MonthPickerWrap>
        ) : null}
        {this.state.currentMonth ? (
          <>
            <h5>Single Click any Day</h5>
            <h5>Create date range by selecting a second date</h5>
            <h5>
              Reset by clicking first day, or double clicking any selected dates
            </h5>
          </>
        ) : null}
        {this.state.currentMonth ? (
          <CalendarDaysWrap>
            {this.state.monthInfo.name ? this.createCalendar() : null}
          </CalendarDaysWrap>
        ) : null}
        {this.state.selectedDay ? (
          <BottomWrap>
            <SelectedDateText>Selected Dates:</SelectedDateText>
            <TwoDayWrap>
              <SelectedDayWrap>
                {this.state.monthInfo.name} {this.state.selectedDay}
              </SelectedDayWrap>
              {this.state.secondDay ? (
                <SelectedDayWrap> - </SelectedDayWrap>
              ) : null}
              {this.state.secondDay ? (
                <SelectedDayWrap>
                  {this.state.monthInfo.name} {this.state.secondDay}
                </SelectedDayWrap>
              ) : null}
            </TwoDayWrap>
          </BottomWrap>
        ) : null}
        {this.props.information ? (
          <ReduxWindow>
            Redux: You made an update at: {this.displayReduxInformation()}
          </ReduxWindow>
        ) : null}
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

const YearPicker = styled.div``;
const MonthPickerWrap = styled.div`
  display: flex;
`;
const MonthChangeButtonWrap = styled.div`
  display: flex;
  width: 25px;
  height: 25px;

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

  &:hover {
    filter: ${props => props.shifter};
    cursor: ${props => props.pointer};
  }
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectedDateText = styled.h2``;

const DayText = styled.h3``;

const SelectedDayWrap = styled.div``;
const TwoDayWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ReduxWindow = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 50px;
  width: 50%;
  display: flex;
  margin: 0 10px 10px 0;
  align-items: flex-end;
  justify-content: flex-end;
`;

const mapStateToPeterson = store => {
  return {
    information: store
  };
};

export default connect(mapStateToPeterson)(App);
