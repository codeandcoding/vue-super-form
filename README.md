# Vue super form

## Usage

Import or require Vue and 'Vue super form' in your code:

``` javascript
import Vue from 'vue'
import SuperForm from 'vue-super-form'
```
The form expects the following props:

| Prop         | Type     | Default    | Required  | Description |
| ------------ | -------  | ---------- | --------- | ----------- |
| schema       | Object   |            | Yes       | A JSON schema, defining the form's fields. It should conform to [JSON schema definitions](http://json-schema.org/latest/json-schema-validation.html). |
| translations | Object   |            | No        |   |

<small>You can pass a `v-model` prop to the form for two-way data binding</small>

Or use individual input elements:

``` javascript
import Vue from 'vue'
import { SuperText, SuperSelect } from 'vue-super-form'
```

Individual input elements expect the following props:

| Prop         | Type     | Default    | Required  | Description |
| ------------ | -------  | ---------- | --------- | ----------- |
| name         | String   |            | Yes       | The input name for the field |
| label        | String   |            | No        | The label for the input |
| placeholder  | String   |            | No        | A placeholder for the field |
| validation   | Object   |            | No        | Validation rules (TBD)  |
| readonly     | Boolean  | false      | No        | Render the field as readonly (ie. disabling input) |

<small>Individual components accept a `value` prop, and emit a custom `onChange` event on change.</small>

## Development

For development purposes, you can start a hot-reloading development server:

``` bash
yarn dev
```
The example application is now accessible at `localhost:3000`