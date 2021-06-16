# textlint-rule-comma-in-list-item

textlint rule checks comma in list item.

OK:

```markdown
- foo
```

NG:

```markdown
- foo,bar
```

## Install

Install with [npm](https://www.npmjs.com/):

```shell
npm install https://github.com/chick-p/textlint-rule-comma-in-list-item
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "comma-in-list-item": true
    }
}
```

Via CLI

```shell
textlint --rule comma-in-list-item README.md
```

## Options

Please write your configurations in `.textlintrc`.

```json
{
    // Built-in recognized comma mark list
    "commaMarks": [",", "、", "，"],
    // Allow ordered list item
    // 1. ~.
    // 2. ~.
    "allowOrderedList": false,
}
```

### commaMarks

Built-in recognized comma mark list.
The default value is `[",", "、", "，"]`.

### allowOrderedList

Allow ordered list item. The default value is `false`.

```markdown
1. ~.
2. ~.
```

## Related

- [textlint-rule-period-in-list-item](https://github.com/textlint-rule/textlint-rule-period-in-list-item)

## Build

Builds source codes for publish to the `lib` folder.
You can write TypeScript source codes in `src/` folder.

## Tests

Run test code in `test` folder.

```shell
yarn test
```
