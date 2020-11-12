const withPlugins = require('next-compose-plugins');
const optimizedImages = require('@mrroll/next-optimized-images');

module.exports = withPlugins(
[
  [optimizedImages, {
    /* config for next-optimized-images */
    mozjpeg: {
      quality: 20,
    },
  }],

  // your other plugins here

]


	,{
	target: 'serverless',
	webpack: function (config,{isServer}) {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader',
		});
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
		config.module.rules.push({
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            // If you want to enable sharp support:
            adapter: require('responsive-loader/sharp'),
          }
        }
      });

		return config
	},
})

