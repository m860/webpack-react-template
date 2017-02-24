var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var isProduction = function () {
	return process.env['NODE_ENV'] === 'production';
};

var plugins=[
	new webpack.ProvidePlugin({
		React: 'react'
		, ReactDOM: "react-dom"
		, classNames: "classNames"
	}),
	new HtmlWebpackPlugin({
		filename: "index.html",
		template: './src/index.html',
		inject: false
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [
				autoprefixer({
					browsers: ['> 5%']
				})
			]
		}
	}),
	new ExtractTextPlugin(isProduction()?"[contenthash].css":"style.css"),
	new webpack.optimize.CommonsChunkPlugin({
		name: "vendor"
		, filename: "vendor.bundle.js"
	}),
	new CleanWebpackPlugin(['dist'], {
		root: __dirname,
		verbose: true,
		dry: false
	})
];

if(isProduction()){
	plugins.push(new UglifyJSPlugin());
	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	}))
}

module.exports = {
	entry: {
		index: './src/App.js',
		vendor: [
			"babel-polyfill",
			"react",
			"react-dom",
			"react-router",
			"classNames"
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isProduction() ? 'bundle.min.js' : 'bundle.js',
		chunkFilename: isProduction() ? "[chunkhash].min.js" : "[id].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use:[
					"babel-loader",
					{
						loader:"eslint-loader",
						options:{
							configFile:isProduction()?path.resolve(__dirname,".eslintrc"):path.resolve(__dirname,".dev.eslintrc")
						}
					}
				],
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				include: [
					path.resolve(__dirname, "src")
				]
			}, {
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader"
					}, {
						loader: "postcss-loader"
					}, {
						loader: "sass-loader"
					}]
				})
			}, {
				test: /\.css$/,
				loader: ["style-loader", "css-loader"]
			}, {
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	},
	plugins: plugins
}