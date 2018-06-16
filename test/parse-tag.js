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

    tag = '<something-custom non-valued-attribute valued-attribute=\'value\'>';

    t.deepEqual(parseTag(tag), {
        type: 'tag',
        attrs: {
            valued-attribute: 'value',
            non-valued-attribute: ''
        },
        name: 'something-custom',
        voidElement: false,
        children: []
    });

    t.end();
});
