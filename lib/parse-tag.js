var attrRE = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g;

// create optimized lookup object for
// void elements as listed here: 
// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
var lookup = (Object.create) ? Object.create(null) : {};
lookup.area = true;
lookup.base = true;
lookup.br = true;
lookup.col = true;
lookup.embed = true;
lookup.hr = true;
lookup.img = true;
lookup.input = true;
lookup.keygen = true;
lookup.link = true;
lookup.menuitem = true;
lookup.meta = true;
lookup.param = true;
lookup.source = true;
lookup.track = true;
lookup.wbr = true;

module.exports = function (tag) {
    var i = 0;
    var key;
    var res = {
        type: 'tag',
        name: '',
        voidElement: false,
        attrs: {},
        children: []
    };

    var matches = tag.match(attrRE);

    var tagName = matches.shift();
    if (lookup[tagName] || tag.charAt(tag.length - 2) === '/') {
        res.voidElement = true;
    }

    matches.forEach((match, index) => {
        if(!_isValue(match)) {
            res.attrs[match] = "";
        } else {
            res.attrs[matches[index-1]] = match.replace(/['"]/g, '');
        }
    });

    return res;
};


function _isValue(potentialValue) {
    if(potentialValue.indexOf('"') != -1 || potentialValue.indexOf("'") != -1) {
        return true;
    } else {
        return false;
    }
}