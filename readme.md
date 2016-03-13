# patternplate-transform-resolve-includes

[patternplate](/sinnerschrader/patternplate)
transform pattern dependency includes to interoperable paths.

## Installation

```shell
npm install --save patternplate-transform-resolve-includes
```

## Transformation

### Input

```less
// foo/bar/foo/index.js
@import 'bar';
@import 'baz';
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

```less
@import 'baz/index.less';
@import '../../baz/bar/index.less';
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
