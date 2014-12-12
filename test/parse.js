var test = require('tape');
var HTML = require('../index');


test('parse', function (t) {
    var html = '<div class="oh"><p></p></div>';
    var parsed = HTML.parse(html);    
    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div',
        attrs: {
            class: 'oh'
        },
        selfClosing: false,
        children: [
            {
                type: 'tag',
                name: 'p',
                attrs: {},
                children: [],
                selfClosing: false
            }
        ]
    });
    t.equal(html, HTML.stringify(parsed));

    html = '<div class="oh"><p>hi</p></div>';
    parsed = HTML.parse(html);

    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div',
        attrs: {
            class: 'oh'
        },
        selfClosing: false,
        children: [
            {
                type: 'tag',
                name: 'p',
                attrs: {},
                selfClosing: false,
                children: [
                    {
                        type: 'text',
                        content: 'hi'
                    }
                ]
            }
        ]
    });
    t.equal(html, HTML.stringify(parsed));

    html = '<div>oh <strong>hello</strong> there! How are <span>you</span>?</div>';
    parsed = HTML.parse(html);

    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div',
        attrs: {},
        selfClosing: false,
        children: [
            {
                type: 'text',
                content: 'oh '
            },
            {
                type: 'tag',
                name: 'strong',
                attrs: {},
                selfClosing: false,
                children: [
                    {
                        type: 'text',
                        content: 'hello'
                    }
                ]
            },
            {
                type: 'text',
                content: ' there! How are '
            },
            {
                type: 'tag',
                name: 'span',
                attrs: {},
                selfClosing: false,
                children: [
                    {
                        type: 'text',
                        content: 'you'
                    }
                ]
            },
            {
                type: 'text',
                content: '?'
            }
        ]
    });
    t.equal(html, HTML.stringify(parsed));

    html = '<div class="handles multiple classes" and="attributes"></div>';
    parsed = HTML.parse(html);

    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div',
        attrs: {
            class: 'handles multiple classes',
            and: 'attributes'
        },
        selfClosing: false,
        children: []
    });
    t.equal(html, HTML.stringify(parsed));

    html = '<div class=\'handles\' other=47 and="attributes"></div>';
    parsed = HTML.parse(html);

    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div',
        attrs: {
            class: 'handles',
            other: '47',
            and: 'attributes'
        },
        selfClosing: false,
        children: []
    });
    t.equal(HTML.stringify(parsed), '<div class="handles" other="47" and="attributes"></div>');

    html = '<div-custom class="oh"><my-component some="thing"><p>should be ignored</p></my-component></div-custom>';
    parsed = HTML.parse(html, {
        components: {
            'my-component': 'something'
        }
    });

    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div-custom',
        attrs: {
            class: 'oh'
        },
        selfClosing: false,
        children: [
            {
                type: 'component',
                name: 'my-component',
                attrs: {
                    some: 'thing'
                },
                selfClosing: false,
                children: []
            }
        ]
    }, 'should not include children of registered components in AST');

    html = '<div><my-component thing="one">ok</my-component><my-component thing="two">ok</my-component></div>';
    parsed = HTML.parse(html, {
        components: {
            'my-component': 'something'
        }
    });

    t.deepEqual(parsed, {
        type: 'tag',
        name: 'div',
        attrs: {},
        selfClosing: false,
        children: [
            {
                type: 'component',
                name: 'my-component',
                attrs: {
                    thing: 'one'
                },
                selfClosing: false,
                children: []
            },
            {
                type: 'component',
                name: 'my-component',
                attrs: {
                    thing: 'two'
                },
                selfClosing: false,
                children: []
            }
        ]
    })

    t.end();
});
