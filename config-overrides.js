// Lib
const { compose } = require('react-app-rewired')

// Webpack
const rewireStyledComponents = require('react-app-rewire-styled-components')

/* config-overrides.js */
module.exports = function override(config, env) {
    // :: Defined Preload Webpack Plugin

    console.log(config, 'config re')
    if (env !== 'production') {
        const rewires = compose(rewireStyledComponents)
        return rewires(config, env)
    }
    return config
}
