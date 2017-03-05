# patternplate-transform-resolve-includes

[![Greenkeeper badge](https://badges.greenkeeper.io/sinnerschrader/patternplate-transform-resolve-includes.svg)](https://greenkeeper.io/)

[patternplate](/sinnerschrader/patternplate)
transform pattern dependency includes to interoperable paths.

## Installation

```shell
npm install --save patternplate-transform-resolve-includes
```

## Transformation

### Input

```css
// foo/bar/foo/index.css
@import 'bar';
@import 'baz';
@import 'npm://normalize.css';
@import 'normalize.css';
```

```js
// foo/bar/foo/pattern.json
{
  "name": "foo",
  "patterns": {
    "bar": "foo/bar/baz",
    "baz": "baz/bar/foo"
  }
}
```

### Output

```css
@import 'baz/index.css';
@import '../../baz/bar/index.css';
@import 'npm://normalize.css';
@import 'normalize.css';
```

## Configuration

Install `patternplate-transform-resolve-includes`,
[patternplate-server](sinnerschrader/patternplate)
currently ships with `patternplate-transform-resolve-includes`
working on `*.less`, `*.css` files by default.

### Parameters

```js
// configuration/patternplate-server/transforms.js
module.exports = {
  "resolve-imports": {
    "resolve": "%(outputName)s/%(patternId)s/index.%(extension)s"
  }
}
```

---

Copyright 2016 by
[SinnerSchrader Deutschland GmbH](https://github.com/sinnerschrader)
and [contributors](./graphs/contributors).
Released under the [MIT license]('./license.md').
