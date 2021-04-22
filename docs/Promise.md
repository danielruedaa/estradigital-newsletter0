# Newsletter

## Configuration

1. Import the `chefcompany.newsletter` app to your theme's dependencies in the `manifest.json`, for example:

```json
  dependencies: {
    "chefcompany.newsletter": "0.x"
  }
```

2. Add the `chef-promise` interace to your store theme

```json
  "store.home": {
    "blocks": ["chef-promise"]
  }
```

## JavaScript API (advanced)
| Prop name    | Type     | Description                         | Default value |
| ------------ | -------- | ----------------------------------- | ------------- |
| `lineHeight` | `number` | height in line mode | 202      |
| `blockHeight` | `number` | height in block mode | 600        |
| `mode` | `string: ['block', 'line']` | mode | `line`        |
| `promiseList` | `PromiseListProps[]` | items | []        |


### promiseListProps

| Prop name    | Type     | Description                         | Default value |
| ------------ | -------- | ----------------------------------- | ------------- |
| `icon` | `string` | icon url | null      |
| `title` | `number` | title of item | null        |
| `description` | `string` | description of item | null       |


## Customization

In order to apply CSS customizations

| Class name            |
| --------------------- |
| `promiseContainer`        |
| `promiseItemContainer`            |
| `promiseItemLine`             |
| `promiseItemImage`            |
| `promiseItemTitle`        |
| `promiseItemDescription`  |
| `flexspace` |
