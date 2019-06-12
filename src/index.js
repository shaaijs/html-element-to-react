import React from 'react'

function camelCase(s, delimiter) {
    let a = s.split(delimiter)
    return delimiter + a[1].slice(0, 1).toUpperCase() + a[1].slice(1, a[1].length)
}

function getEvents(el) {
    let events = {}

    for (k in el) {
        if (/^on/.test(k) && el[k]) {
            events[camelCase(k, 'on')] = el[k]
        }
    }

    return events
}

function getChildren(elements) {
    let children = []
    if (!elements) return children
    for (let i = 0; i < elements.length; i++) {
        let el = elements[i]
        if (el.childElementCount) {
            let props = { ...getEvents(el) }
            children.push(React.createElement(el.tagName.toLowerCase(), props === {} ? null : props, ...getChildren(el.children)))
        } else {
            let props = { ...getEvents(el) }

            children.push(React.createElement(el.tagName.toLowerCase(), props === {} ? null : props, el.textContent))
        }
    }

    return children
}

module.exports.convert = function(domElement) {
    let props = { ...getEvents(domElement) }
    return React.createElement(domElement.tagName.toLowerCase(), props === {} ? null : props, ...getChildren(domElement.children))
}