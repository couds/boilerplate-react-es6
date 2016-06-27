module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion" : "6",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-console": 0,
    "no-param-reassign" : 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "no-shadow": 0,
    "import/no-unresolved": 0,
    "global-require": 0,
    "react/jsx-first-prop-new-line": 0
  }
};