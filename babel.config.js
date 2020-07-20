module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 0.5%, last 2 versions, Firefox ESR, not dead"
        },
        useBuiltIns: "usage",
        corejs: "3",
        modules: false,
      },
    ],
  ];

  return {
    presets,
  };
};
