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
    }

    _getBgColor = () => {}
    render() {
        const { color, weather, geocode } = this.props.weatherData
        let date = new Date(weather.time * 1000)
        date = date.toDateString().split(' ')
        date[0] = getDays(date[0])
        const actualDate = date.slice(0, date.length - 1).join(' ')
        return (
            <WrapperPage bgColor={`hsl(${color.hue}, 100%, 50%)`}>
                <Container>
                    <WeatherImage>
                        <div className="icon">
                            <Skycons
                                color="white"
                                icon={weather.icon
                                    .split('-')
                                    .join('_')
                                    .toUpperCase()}
                            />
                        </div>
                    </WeatherImage>
                    <ContentWrapper>
                        <CurrentTimeContent>
                            <p>Today, {actualDate}</p>
                            {geocode &&
                                geocode.address_components[4] && (
                                    <p>{`at ${geocode.address_components[4].long_name}`}</p>
                                )}
                            <div className="today">
                                <h2>{weather.summary}</h2>
                                <h2>{Math.round(weather.temperature)}&deg;C</h2>
                            </div>
                        </CurrentTimeContent>
                        <NextDayContent>
                            <div>
                                <Skycons
                                    color="white"
                                    icon="PARTLY_CLOUDY_DAY"
                                    style={{
                                        height: '50px',
                                    }}
                                />
                            </div>
                            <div>
                                <p className="next-day__desc">Tommorow</p>
                                <p className="next-day__desc">Selasa 31 Agustus 2018</p>
                            </div>
                        </NextDayContent>
                    </ContentWrapper>
                </Container>
            </WrapperPage>
        )
    }
}

export default LoaderHOC('weatherData')(WeatherPage)
