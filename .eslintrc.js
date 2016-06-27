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
    "no-param-reassign" : 0
  }
};