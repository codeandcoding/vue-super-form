# Vue super form

## Usage

Import or require Vue and 'Vue super form' in your code:

``` javascript
import Vue from 'vue'
import SuperForm from 'vue-super-form'
```

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

## Development

For development purposes, you can start a hot-reloading development server:

``` bash
yarn dev
```
The example application is now accessible at `localhost:3000`