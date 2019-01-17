<template>
    <div>
        <span>Super form.</span>
        <form class="form">
            <component
                v-for="field in fields" 
                :key="field.key"
                :is="field.component"
                v-on:onChange="onChange"
                v-bind="field.props">
            </component>
        </form>
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import * as inputs from './';

    export default {
        name: 'SuperForm',
        props: {
            schema: {
                type: Object,
                required: true,
            },
            value: {},
        },
        data() {
            return {
                values: {
                    ...this.value,
                },
            };
        },
        computed: {
            fields() {
                const fields = this.schema.properties;
                return Object.keys(fields).map(field => this.getFieldConfig(field, fields[field]));
            }
        },
        methods: {
            onChange(name, val) {
                this.values[name] = val;
                this.$emit('input', _.clone(this.values))
            },
            getFieldConfig(name, config) {
                return {
                    key: name,
                    component: this.getFieldComponent(config),
                    props: {
                        name,
                        ...this.getFieldProps(name, config),
                    },
                };
            },
            getFieldComponent(config) {
                const widget = config['ui:widget'];
                const hasKey = key => Object.prototype.hasOwnProperty.call(config, key);

                let componentName;
                switch (config.type) {
                    case 'number':
                        componentName = hasKey('enum') ? 'SuperSelect' : 'SuperNumber';
                        componentName = widget ? this.getWidgetComponent(widget) : componentName;
                        break;
                    case 'string':
                        componentName = hasKey('enum') ? 'SuperSelect' : 'SuperText';
                        componentName = widget ? this.getWidgetComponent(widget) : componentName;
                        break;
                    case 'array':
                        componentName = widget ? this.getWidgetComponent(widget) : 'SuperSelect';
                        break;
                    case 'null':
                    case 'boolean':
                    case 'object':
                    case 'integer':
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
            getFieldProps(name, config) {
                const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
                
                return {
                    type: config.type,
                    items: hasKey(config, 'items') ? config.items.enum : config.enum,
                    value: hasKey(this.values, name) ? this.values[name] : null,
                };
            }
        },
    }
</script>

<style scoped lang="scss">
    .form {
        display: block;
        
        > * {
            display: block;
        }
    }
</style>