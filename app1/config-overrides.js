/*
 * @Author: 邓世城
 * @Date: 2020-09-27 17:18:17
 * @LastEditors: 邓世城
 * @LastEditTime: 2020-09-28 11:50:28
 */
  
const { name } = require('./package.json');
console.log(name)


module.exports = {
  webpack: function override(config, env) {
    // config.entry = config.entry.filter(
    //   (e) => !e.includes('webpackHotDevClient')
    // );

    config.output.library = `${name}`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.publicPath = `http://localhost:3000/`
    
    return config;
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};