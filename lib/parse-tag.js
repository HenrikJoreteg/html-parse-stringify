var attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

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
    var res = {
        type: 'tag',
        name: '',
        voidElement: false,
        attrs: {},
        children: []
    };

    var tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
    if(tagMatch)
    {
        res.name = tagMatch[1];
        if (lookup[tagMatch[1].toLowerCase()] || tag.charAt(tag.length - 2) === '/') {
            res.voidElement = true;
        }

        if (res.name === '!--') { // comment tag
            res = {
                type: 'comment',
            };
            res.comment = '';
            var end = tag.indexOf('-->');
            if (end !== -1) {
                var comment = tag.slice(4, end);
                res.comment = comment;
            }
            return res;
        }
    }

    var reg = new RegExp(attrRE);
    var result = null;
    for (; ;)
    {
        result = reg.exec(tag);

        if (result === null) {
            break;
        }

        if (!result[0].trim()) {
            continue;
        }

        if (result[1])
        {
            var attr = result[1].trim();
            var arr = [attr, ''];

            if(attr.indexOf('=') > -1) {
                arr = attr.split('=');
            }

            res.attrs[arr[0]] = arr[1];
            reg.lastIndex--;
        }
        else if (result[2]) {
            res.attrs[result[2]] = result[3].trim().substring(1,result[3].length - 1);
        }
    }

    return res;
};
