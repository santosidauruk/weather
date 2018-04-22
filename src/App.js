import React, { Component } from 'react'
import { Container, Content, CurrentTimeContent, NextDayContent, NextDayWeather } from './style'
import Skycons from 'skycons'

class App extends Component {
    state = {
        position: {},
        error: '',
        errCode: {
            1: 'denied bro',
            2: 'not avail',
            3: 'timeout',
        },
    }
    componentDidMount() {
        this._getLocation()
    }

    _getLocation = () => {
        if ('geolocation' in navigator) {
            const success = (positionResponse) => {
                const position = {
                    latitude: positionResponse.coords.latitude,
                    longitude: positionResponse.coords.longitude,
                }
                this.setState({ position })
            }

            const error = (posErr) => {
                this.setState({ error: this.state.errCode[posErr.code] })
            }

            window.navigator.geolocation.getCurrentPosition(success, error)
        } else {
            console.log('device tidak support')
        }
    }
    render() {
        const skycons = new Skycons()
        console.log(Skycons)
        // skycons.add('icon1', Skycons.PARTLY_CLOUDY_DAY)
        // skycons.play()
        // console.log(skycons.)
        return (
            <Container bgColor={'blue'}>
                <CurrentTimeContent>
                    <h2>Rainy Day</h2>
                    <p>Yogyakarta</p>
                    <h1>28</h1>
                </CurrentTimeContent>
                <NextDayContent>
                    Monday
                    <NextDayWeather>14&deg;C</NextDayWeather>
                </NextDayContent>
                <NextDayContent>
                    &deg;C
                    <canvas id="icon1" width="128" height="128" />
                </NextDayContent>
            </Container>
        )
    }
}

export default App
