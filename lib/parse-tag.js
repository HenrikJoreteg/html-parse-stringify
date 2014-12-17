var attrRE = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g;
var voidElements = require('void-elements');


module.exports = function (tag) {
    var i = 0;
    var key;
    var res = {
        selfClosing: tag.slice(-2, -1) === '/',
        attrs: {},
        type: 'tag',
        children: [],
        name: ''
    };

    tag.replace(attrRE, function (match) {
        if (i % 2) {
            key = match;
        } else {
            if (i === 0) {
                res.name = match;
                if (voidElements.indexOf(match) !== -1) {
                    res.selfClosing = true;
                }
            } else {
                res.attrs[key] = match.replace(/['"]/g, '');
            }
        }
        i++;
    });

    return res;
};
