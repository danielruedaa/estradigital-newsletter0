# Contact

## Configuration

1. Import the `chefcompany.newsletter` app to your theme's dependencies in the `manifest.json`, for example:

```json
  dependencies: {
    "chefcompany.newsletter": "0.x"
  }
```

2. Add the `isobar-contact` interace to your store theme

```json
  "store.home": {
    "blocks": ["isobar-contact"]
  }
```

## JavaScript API (advanced)

| Prop name    | Type     | Description                         | Default value |
| ------------ | -------- | ----------------------------------- | ------------- |
| `submitText` | `String` | submit input | `Enviar`        |
| `beforeHtml` | `String` | html | ``        |
| `afterHtml` | `String` | html | ``        |
| `terms` | `String (HTML)` | terms description | `<div>Terms <a href="/">link</a></div>`        |
| `useTerms` | `boolean` | show or hidden terms | true |
| `checkedDefault` | `boolean` | default value for terms | false |
| `successMessage` | `string` | success message | 'Se ha suscrito con éxito.' |
| `title` | `string` | Contact title | 'Contáctanos' |
| `formTitle` | `string` | form title | '' |
| `fullWidth` | `boolean` | layout | false |

## Customization

In order to apply CSS customizations

| Class name            |
| --------------------- |
| `container_contact`        |
| `column_beforeHTML`            |
| `column_formContact`             |
| `inputGroupContact`            |
| `inputFieldContact`        |
| `fieldMsgErrorContact`  |
| `inputGroupCheckContact` |
| `contactTitle`          |
| `formTitle`              |
| `textareaFieldContact`              |
| `primaryContactBtn`              |
