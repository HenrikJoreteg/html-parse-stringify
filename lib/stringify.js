function attrString(attrs) {
    var buff = [];
    for (var key in attrs) {
        if (attrs[key] === null) {
            buff.push(key);
        } else {
            buff.push(key + '="' + attrs[key] + '"');
        }
    }
    if (!buff.length) {
        return '';
    }
    return ' ' + buff.join(' ');
}

function stringify(buff, doc) {
    switch (doc.type) {
    case 'text':
        return buff + doc.content;
    case 'tag':
        var tagEnd = (doc.voidElement && doc.name.toLowerCase() !== '!doctype') ? '/>' : '>';
        buff += '<' + doc.name + (doc.attrs ? attrString(doc.attrs) : '') + tagEnd;
        if (doc.voidElement) {
            return buff;
        }
        return buff + doc.children.reduce(stringify, '') + '</' + doc.name + '>';
    case 'comment':
        buff += '<!--' + doc.comment + '-->';
        return buff;
    }
}

module.exports = function (doc) {
    return doc.reduce(function (token, rootEl) {
        return token + stringify('', rootEl);
    }, '');
};
