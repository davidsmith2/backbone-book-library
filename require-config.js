({
    appDir: 'public/',
    baseUrl: 'js',
    dir: 'build/',
    fileExclusionRegExp: /^(r|build)\.js$/,
    mainConfigFile: './public/js/main.js',
    modules: [{ name: 'main' }],
    optimizeCss: 'standard',
    removeCombined: true
})