module.exports = {
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:vue/strongly-recommended"
    ],
    "rules": {
        'no-console': 'off',
        'indent': 'off',
        'vue/script-indent': ['warn', 2, {
            'baseIndent': 0
        }],
        'vue/html-indent': ['warn', 2,  {
            alignAttributesVertically: true
          }],
        "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never",
        "multiline": "always"
        }]
    }
};