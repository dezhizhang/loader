
const path = require('path');
const babel = require('@babel/core');


function loader(source) {
    const options = this.getOptions(); 
    const { code } = babel.transformSync(source,options)
    console.log('hello')
    return code;

}

module.exports = loader;

