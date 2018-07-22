import React, { Component } from 'react'
import axios from 'axios'
import { Container, CurrentTimeContent, NextDayContent, NextDayWeather } from './style'
import Skycons from 'react-skycons'

import { apiUrl, acceptHeader } from './constant'

class App extends Component {
    state = {
        position: {},
        error: '',
        errCode: {
            1: 'denied bro',
            2: 'not avail',
            3: 'timeout',
        },
        isLoading: true,
        weatherData: {},
    }
    componentDidMount() {
        this._getLocation()
        // console.log(skycons)
        // const skycons = new Skycons()
        // skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    }

    _getLocation = () => {
        if ('geolocation' in navigator) {
            const success = (positionResponse) => {
                const position = {
                    latitude: positionResponse.coords.latitude,
                    longitude: positionResponse.coords.longitude,
                }
                console.log(positionResponse, 'pos response')
                this.setState({ position })
                this._getWeather(this.state.position)
            }

            const error = (posErr) => {
                this.setState({ error: this.state.errCode[posErr.code] })
            }

            window.navigator.geolocation.getCurrentPosition(success, error)
        } else {
            console.log('device tidak support')
        }
    }

    _getWeather = ({ latitude, longitude }) => {
        this.setState({ isLoading: true })
        axios
            .get(`${apiUrl}/api/weathers/?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => {
                console.log(response, 'api res')
                this.setState({
                    weatherData: response.data,
                    isLoading: false,
                })
            })
            .catch((e) => console.log(e))
    }

    render() {
        // skycons.add('icon1', Skycons.PARTLY_CLOUDY_DAY)
        // skycons.play()
        // console.log(skycons.)
        // const { temperature, summary, icon } = this.state.weatherData.weather
        return (
            <Container bgColor={'blue'}>
                {this.state.isLoading ? (
                    <div>loading</div>
                ) : (
                    <React.Fragment>
                        <CurrentTimeContent>
                            <h2>{this.state.weatherData.weather.summary}</h2>
                            <p>Yogyakarta</p>
                            <h1>28</h1>
                        </CurrentTimeContent>
                        <NextDayContent>
                            Monday
                            <NextDayWeather>14&deg;C</NextDayWeather>
                        </NextDayContent>
                        <NextDayContent>
                            DEerajat&deg;C
                            <canvas id="icon1" width="128" height="128" />
                            <Skycons
                                color="black"
                                icon="PARTLY_CLOUDY_DAY"
                                style={{
                                    width: '148px',
                                    height: '72px',
                                }}
                            />
                        </NextDayContent>
                    </React.Fragment>
                )}
            </Container>
        )
    }
}

export default App
