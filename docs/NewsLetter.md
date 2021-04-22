# Newsletter

## Configuration

1. Import the `chefcompany.newsletter` app to your theme's dependencies in the `manifest.json`, for example:

```json
  dependencies: {
    "chefcompany.newsletter": "0.x"
  }
```

2. Add the `chef-newsletter` interace to your store theme

```json
  "store.home": {
    "blocks": ["chef-newsletter"]
  }
```

## JavaScript API (advanced)

| Prop name    | Type     | Description                         | Default value |
| ------------ | -------- | ----------------------------------- | ------------- |
| `placeholderText` | `String` | placeholder input | `Suscríbete`        |
| `regex` | `String` | regex | `^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$`        |
| `errorEmailMessage` | `String` | error message email input | `Please, enter a valid email.`        |
| `errorTermsMessage` | `String` | error message email input | `Pelase, accept terms.`        |
| `terms` | `String (HTML)` | terms description | `<div>Terms <a href="/">link</a></div>`        |
| `beforeHtml` | `String (HTML)` | newsletter description, you can complete newsletter design with this key, this is shown before of the form | `<h2>Your HTML here!</h2>`        |
| `afterHtml` | `String (HTML)` | newsletter description, you can complete newsletter design with this key, this is shown before of the form | null  |
| `useTerms` | `boolean` | show or hidden terms | true |
| `checkedDefault` | `boolean` | default value for terms | false |
| `positions` | `string[] = ['button', 'input', 'error' , 'terms', 'termsError']` | you can create a custom newsletter with this key, you can modify elements positions | ['button', 'input', 'error' , 'terms', 'termsError'] |
| `defaultPosition` | `boolean` | you can use default or custom position of newsleter elements | true |
| `showDefaultInputError` | `boolean` | you can use default or custom error | false |
| `successMessage` | `string` | success message | 'Se ha suscrito con éxito.' |
| `inputWithIcon` | `string` | you can send icon id used in prefix input | 'hpa-chefcompany-mail' |
| `inputSize` | `number` | you can send icon size | 'hpa-chefcompany-mail' |
| `buttonWithIcon` | `string` | you can send icon for submit button | '' |
| `buttonWithIconSize` | `number` | you can send icon size for submit button | 24 |

## Customization

In order to apply CSS customizations

| Class name            |
| --------------------- |
| `newsletterContainer`        |
| `newsletterInput`            |
| `newsletterCheckbox`             |
| `newsletterButton`            |
| `newsletterTermsMessage`        |
| `newsletterBeforeHtml`  |
| `newsletterContentForm` |
| `newsletterInputAndButtonContainer`          |
| `newsletterCheckboxContainer`              |
| `newsletterTermsErrorContainer`              |
| `newsletterContentForm`              |
| `newsletterAfterHtml`              |
| `newsletterDefaultError`              |
| `newsletterInputErrorContainer`              |
| `newsletterFormContainer`              |
| `newsletterTermsText`              |