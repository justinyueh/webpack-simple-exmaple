const path = require('path');
const fs = require('fs');

module.exports = class ManifestPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.done.tap('ManifestPlugin', (stats) => {
      console.log('done');
      const statsJson = stats.toJson();
      const { assetsByChunkName, modules } = statsJson;

      console.log(JSON.stringify(statsJson, null, 2))

      modules.forEach((module) => {
        if (module.assets && module.assets.length) {
          [assetsByChunkName[module.name]] = module.assets;
        }
      });

      fs.mkdir(path.resolve(babelOutDir), () => {
        fs.writeFileSync(
          path.resolve(`./dist/manifest.json`),
          JSON.stringify(assetsByChunkName, null, 2),
        );
      });
    });
  }
}
