const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	devServer: {
		publicPath: "/",
		contentBase: [path.join(__dirname, "public")],
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
