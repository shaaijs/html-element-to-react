# html-element-to-react
Convert HTML DOM elements to React

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { convert } from 'domelement-to-react'

const App = convert(htmlElement)

ReactDOM.render(App, document.getElementById('app'))
```