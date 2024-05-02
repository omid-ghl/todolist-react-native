const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

const overrides = [
  {
    test: './node_modules/ethers',
    plugins: [
      '@babel/plugin-proposal-private-property-in-object',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
    ],
  },
];

plugins.push(
  [
    'module-resolver',
    {
      alias: {
        src: './src',
        '@Assets': './src/Assets',
        '@Commons': './src/Commons',
        '@Services': './src/Services',
        '@Containers': './src/Containers',
        '@Models': './src/Models',
        '@Navigators': './src/Navigators',
        '@Theme': './src/Theme',
        '@Translations': './src/Translations',
        '@Store': './src/Store',
        '@constants': './src/constants',
        '@Hooks': './src/Hooks',
      },
    },
  ],
  '@babel/plugin-proposal-export-namespace-from',
  'react-native-reanimated/plugin',
  ['@babel/plugin-transform-private-methods', {loose: true}],
);

module.exports = {
  presets,
  plugins,
  overrides,
};
