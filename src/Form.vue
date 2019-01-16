<template>
    <form>
        Super form.
        <component 
            v-for="field in fields" 
            :key="field.key"
            :is="field.component"
            v-bind="field.props">
        </component>
    </form>
</template>

<script>
    import Vue from 'vue';
    import * as inputs from './';

    export default {
        name: 'SuperForm',
        props: {
            schema: {
                type: Object,
                required: true,
            },
        },
        computed: {
            fields() {
                const fields = this.schema.properties;
                return Object.keys(fields).map(field => this.getFieldConfig(field, fields[field]));
            }
        },
        methods: {
            getFieldConfig(name, config) {
                return {
                    key: name,
                    component: this.getFieldComponent(config),
                    props: {
                        name,
                        ...this.getFieldProps(config),
                    },
                };
            },
            getFieldComponent(config) {
                const widget = config['ui:widget'];
                const hasKey = key => Object.prototype.hasOwnProperty.call(config, key);

                let componentName;
                switch (config.type) {
                    case "number":
                        componentName = hasKey('enum') ? 'SuperSelect' : 'SuperNumber';
                        componentName = widget ? this.getWidgetComponent(widget) : componentName;
                        break;
                    case "string":
                        componentName = hasKey('enum') ? 'SuperSelect' : 'SuperText';
                        componentName = widget ? this.getWidgetComponent(widget) : componentName;
                        break;
                    case "array":
                        componentName = widget ? this.getWidgetComponent(widget) : 'SuperSelect';
                        break;
                    case "null":
                    case "boolean":
                    case "object":
                    case "integer":
                    default:
                        componentName = 'SuperText';
                }

                if (!inputs[componentName]) {
                    console.warn(`component '${componentName}' not available`)
                    componentName = 'SuperText';
                }

                return inputs[componentName];
            },
            getWidgetComponent(widget) {
                switch (widget) {
                    case 'radio':
                        return 'SuperRadio';
                    case 'checkbox':
                        return 'SuperCheckbox';
                    default:
                        return 'SuperText';
                }
            },
            getFieldProps(config) {
                const hasKey = key => Object.prototype.hasOwnProperty.call(config, key);
                
                return {
                    items: hasKey('items') ? config.items.enum : config.enum,
                };
            }
        },
    }
</script>

<style lang="scss">
</style>