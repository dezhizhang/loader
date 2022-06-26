
const path = require('path');
const { runLoaders } = require('loader-runner');

const entryFile = path.resolve(__dirname,'src/index.js');
const request = `inline1-loader?key=value!inline2-loader!${entryFile}`;

let rules = [
    {
        test:/\.js$/,
        use:['normal1-loader','normal2-loader']
    },
    {
        test:/\.js$/,
        enforce:'pre',
        use:['pre1-loader','pre2-loader']
    },
    {
        test:/\.js$/,
        enforce:'post',
        use:['post1-loader','post2-loader']
    }
];

let parts = request.split('!');
let resource = parts.pop();
let inlineLoaders = parts;
let preLoaders = [];
let postLoaders = [];
let normalLoders = [];

for(let i=0;i < rules.length;i++) {
    let rule = rules[i];
    if(rule.test.test(resource)) {
        if(rule.enforce === 'post') {
            postLoaders.push(...rule.use);
        }else if(rule.enforce === 'pre') {
            preLoaders.push(...rule.use);
        }else {
            normalLoders.push(...rule.use);
        }
    }
}

let loaders = [...postLoaders,...inlineLoaders,...normalLoders,...preLoaders].map(loader => path.resolve(__dirname,'loaders',loader));



runLoaders({
    resource,
    loaders
},(err,result) => {
    console.log(result);

})


