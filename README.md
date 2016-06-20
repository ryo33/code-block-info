code-block-info
====
Attaches informations to code blocks.

## Installation
`npm install --save code-block-info`

## Example
This example uses the default category.

### Block style
```javascript
import { getInfo, block } from 'code-block-info'

getInfo() // => []

block('info', () => {
  getInfo() // => ['info']

  block('another_info', () => {
    getInfo() // => ['info', 'another_info']
  })

  getInfo() // => ['info']
})

getInfo() // => []
```

### Begin-end style
```javascript
import { getInfo, begin, end } from 'code-block-info'

getInfo() // => []

begin('info')
getInfo() // => ['info']

begin('another_info')
getInfo() // => ['info', 'another_info']
end()

getInfo() // => ['info']
end()

getInfo() // => []
```

## API

### `getInfo([category], info) => codeBlockInfo`
Gets the stack of informations for the specified category.  
- `category` The category for the `info`.
- `info` The information to push to the category
- `codeBlockInfo` An array contains informations

### `block([category], info, func)`
Calls the function with the informationsa.  
- `func` A function which is called with the informations

### `begin([category], info)`
Pushes the information to the stack.

### `end([category], info)`
Pops the information from the stack.

## Using in a library
You should prevent conflicts by using the `category` argument.

## License
MIT
