const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();
const nodeExternals = require('webpack-node-externals');
const path = require('path')

module.exports = {
    mode: 'production',
    entry: '/src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                ],
             
              },
            {
                test: /\.(js|jsx)?$/,
                exclude:/(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    compact: false,
                    presets: ['@babel/react', "@babel/preset-env"]
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    compact: false,
                    limit: 10000,
                    name: 'img/[name].[ext]',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['/node_modules', path.resolve(__dirname, '/src'), path.resolve(__dirname, '/src/Components/*')]
      },
    externals: [nodeExternals()],
    target: 'node',
    plugins: [new DashboardPlugin({handler: DashboardPlugin.setData})]

}