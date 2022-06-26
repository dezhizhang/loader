

function loader(source) {
    console.log('pre2-loader');
    return source + '//pre2-loader';
}

module.exports = loader;
