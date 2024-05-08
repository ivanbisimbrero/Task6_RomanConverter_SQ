module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-cond-assign": [
        "error",
        "always"
    ],
    "indent": [
        "error",
        2
    ],
    "no-use-before-define": "error",
    "semi": [
        "error", 
        "always"
    ],
    "no-trailing-spaces": "error",
    "prefer-const": "error"
  }
};
