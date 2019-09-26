var test = require('tape');
var parseTag = require('../lib/parse-tag');


test('parseTag', function (t) {
    var tag = '<div class=thing other=stuff something=54 quote="me ">';

    t.deepEqual(parseTag(tag), {
        type: 'tag',
        attrs: {
            class: 'thing',
            other: 'stuff',
            something: '54',
            quote: 'me '
        },
        name: 'div',
        voidElement: false,
        children: []
    });

    tag = '<something-custom class=\'single quoted thing\'>';

    t.deepEqual(parseTag(tag), {
        type: 'tag',
        attrs: {
            class: 'single quoted thing'
        },
        name: 'something-custom',
        voidElement: false,
        children: []
    });

    tag = '</p>';

    t.deepEqual(parseTag(tag), {
        type: 'tag',
        attrs: {},
        name: 'p',
        voidElement: false,
        children: []
    });

    tag = '<img src="something" alt="sweet picture"/>';

    t.deepEqual(parseTag(tag), {
        type: 'tag',
        attrs: {
            src: 'something',
            alt: 'sweet picture'
        },
        name: 'img',
        voidElement: true,
        children: []
    });

    tag = '<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-id="175">';

    t.deepEqual(parseTag(tag), {
        type: 'tag', 
        name: 'svg', 
        attrs: { 
            'aria-hidden': 'true', 
            'data-id': '175', 
            style: 'position: absolute; width: 0; height: 0; overflow: hidden;', 
            version: '1.1', 
            xmlns: 'http://www.w3.org/2000/svg', 
            'xmlns:xlink': 'http://www.w3.org/1999/xlink' 
        },
        voidElement: false,
        children: []
    }, 'should parse tags containing attributes with hyphens and/or colons');

    t.end();
});
