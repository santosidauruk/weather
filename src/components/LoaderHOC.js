import React, { Component } from 'react'
import LoadingScreen from './LoadingScreen'
import { Object } from 'core-js'

const Loader = (propName) => (WrappedComponent) => {
    return class extends Component {
        state = {}
        isEmpty = (props) => {
            return (
                props === null ||
                props === undefined ||
                (props.hasOwnProperty('length') && props.length === 0) ||
                Object.keys(props).length === 0
            )
        }
        render() {
            // console.log(propName, this.isEmpty(this.props[propName]), 'prop hoc')
            return this.isEmpty(this.props[propName]) ? (
                <LoadingScreen />
            ) : (
                <WrappedComponent {...this.props} />
            )
        }
    }
}

export default Loader
