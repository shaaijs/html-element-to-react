# html-element-to-react
Convert HTML DOM elements to React

`npm i --save html-element-to-react`

### Usage
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { convert } from 'html-element-to-react'

const App = convert(htmlElement)

ReactDOM.render(App, document.getElementById('app'))
```
