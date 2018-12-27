'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function component() {
    var element = document.createElement('div');
    element.innerHTML = _lodash2.default.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());

//# sourceMappingURL=index-compile.js.map