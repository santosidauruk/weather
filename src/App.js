import React, { Component } from 'react'
import axios from 'axios'
import WeatherPage from './components/WeatherPage'
import { apiUrl, acceptHeader } from './constant'
import moment from 'moment'

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
        weatherData: [],
        // wholeData: [
        //     today: {
        //         date: ,
        //         data:
        //     },
        //     nextDay
        // ]
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
                this.setState({ position })

                // this._getWeather({
                //     latitude: Number('38.907192'),
                //     longitude: Number('-77.036873'),
                // })
                const dates = this._getDates()
                console.log(dates, 'days')

                this._getWeather(position, dates)
            }

            const error = (posErr) => {
                this.setState({ error: this.state.errCode[posErr.code] })
            }

            window.navigator.geolocation.getCurrentPosition(success, error)
        } else {
            console.log('device tidak support')
        }
    }

    _getDates = () => {
        let days = []
        for (let i = 0; i <= 2; i++) {
            const timestamp = moment()
                .add(i, 'days')
                .format('x')
            days.push(Math.floor(timestamp / 1000))
        }
        return days
    }

    /**
     * NOTE:
     * date : []
     * response [{}]
     * date: []
     */
    _getWeather = (position, dates) => {
        this.setState({ isLoading: true })
        let promises = []
        dates.forEach((date, index) => {
            promises.push(this._fetchData(position, date, index))
        })
        console.log(promises, 'prom')
        Promise.all(promises).then((values) => {
            console.log(values)
            const weatherData = values.map((value) => value.data)
            this.setState({ weatherData })
        })
    }

    _fetchData({ latitude, longitude }, date, index) {
        return axios.get(
            `${apiUrl}/api/weathers/?latitude=${latitude}&longitude=${longitude}&timestamp=${date}&geocoding=1`,
            {
                headers: {
                    'accept-header': acceptHeader,
                },
            }
        )
        // .then((response) => {
        // console.log(response.data, index, new Date(date * 1000), 'res')
        // this.setState({
        //     weatherData: response.data,
        //     isLoading: false,
        // })
        // })
        // .catch((e) => console.log(e))
    }

    render() {
        // const hsv = {
        //     hue: this.state.weatherData.color.hue,
        //     saturation: 50,
        //     value: 50,
        // }
        return <WeatherPage weatherData={this.state.weatherData} />
    }
}

export default App
