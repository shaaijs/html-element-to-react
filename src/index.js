import React from "react";

function camelCase(s, delimiter) {
    let a = s.split(delimiter);
    return (
        delimiter + a[1].slice(0, 1).toUpperCase() + a[1].slice(1, a[1].length)
    );
}

function getProps(el) {
    let props = {};

    let events = {};
    for (let k in el) {
        if (/^on/.test(k) && el[k]) {
            events[camelCase(k, "on")] = el[k];
        }

        if (k === "className" && el[k]) {
            props[k] = el[k];
        }

        if (k === "src" && el[k]) {
            props[k] = el[k];
        }
    }
    props = Object.assign(props, events);
    return props;
}

function getChildren(elements) {
    let children = [];
    if (!elements) return children;
    for (let i = 0; i < elements.length; i++) {
        let el = elements[i];
        let props = { ...getProps(el) };

        if (el.childNodes.length) {
            children.push(
                React.createElement(
                    el.tagName.toLowerCase(),
                    props === {} ? null : props,
                    ...getChildren(el.childNodes)
                )
            );
        } else {
            if (el.nodeType === 3) {
                children.push(el.textContent);
            } else if (el.nodeType === 1) {
                if (["VIDEO", "IMG", "AUDIO"].includes(el.nodeName)) {
                    children.push(
                        React.createElement(
                            el.tagName.toLowerCase(),
                            props === {} ? null : props
                        )
                    );
                }
            }
        }
    }

    return children;
}

export const convert = function (domElement) {
    if (!domElement) return null;
    let props = { ...getProps(domElement) };
    return React.createElement(
        domElement.tagName.toLowerCase(),
        props === {} ? null : props,
        ...getChildren(domElement.childNodes)
    );
};
