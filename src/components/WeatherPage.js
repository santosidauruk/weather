import React, { Component } from 'react'
import LoaderHOC from './LoaderHOC'
import {
    Container,
    CurrentTimeContent,
    NextDayContent,
    ContentWrapper,
    WeatherImage,
    WrapperPage,
} from './style'
import { getDays } from '../utils'
import Skycons from 'react-skycons'

class WeatherPage extends Component {
    state = {
        hue: null,
        saturation: 100,
        value: 50,
        todayWeather: {},
        nextDayWeather: {},
    }

    _getActualDate = (time) => {
        let date = new Date(time * 1000)
        date = date.toDateString().split(' ')
        date[0] = getDays(date[0])
        return date.slice(0, date.length - 1).join(' ')
    }

    _createIcon = (icon) => {
        return icon
            .split('-')
            .join('_')
            .toUpperCase()
    }

    _getTodayData = ({ color, weather, geocode }) => {
        const actualDate = this._getActualDate(weather.time)
        return {
            color,
            geocode,
            actualDate,
            weather,
        }
    }

    _getNextDayData = (weatherData) => {
        return weatherData.filter((data, index) => index > 0).map((data) => data.weather)
    }

    render() {
        const today = this.props.weatherData[0]
        const nextDay = this._getNextDayData(this.props.weatherData)
        console.log(nextDay, 'nextDay')
        return (
            <WrapperPage bgColor={`hsl(${today.color.hue}, 100%, 50%)`}>
                <Container>
                    <WeatherImage>
                        <div className="icon">
                            <Skycons color="white" icon={this._createIcon(today.weather.icon)} />
                        </div>
                    </WeatherImage>
                    <ContentWrapper>
                        <CurrentTimeContent>
                            <p> Today, {this._getActualDate(today.weather.time)} </p>
                            {today.geocode &&
                                today.geocode.address_components[4] && (
                                    <p> {`at ${today.geocode.address_components[4].long_name}`} </p>
                                )}
                            <div className="today">
                                <h2> {today.weather.summary} </h2>
                                <h2> {Math.round(today.weather.temperature)}&deg; C </h2>
                            </div>
                        </CurrentTimeContent>
                        {nextDay.map((value, index) => {
                            return (
                                <NextDayContent key={value.time}>
                                    <div>
                                        <Skycons
                                            color="white"
                                            icon={this._createIcon(value.icon)}
                                            style={{
                                                height: '50px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        {/* <p className="next-day__desc"> Tommorow </p> */}
                                        <p className="next-day__desc">
                                            {this._getActualDate(value.time)}
                                        </p>
                                    </div>
                                </NextDayContent>
                            )
                        })}
                    </ContentWrapper>
                </Container>
            </WrapperPage>
        )
    }
}

export default LoaderHOC('weatherData')(WeatherPage)
