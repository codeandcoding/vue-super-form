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
            translations: {
                type: Object,
                required: false,
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
                        if (hasKey('format')) {
                            componentName = this.getWidgetComponent(config['format']);
                            break;
                        }
                        componentName = hasKey('enum') ? 'SuperSelect' : 'SuperText';
                        componentName = widget ? this.getWidgetComponent(widget) : componentName;
                        break;
                    case 'array':
                        componentName = widget ? this.getWidgetComponent(widget) : 'SuperSelect';
                        break;
                    case 'boolean':
                        componentName = 'SuperCheckbox';
                        break;
                    case 'null':
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
                    case 'date':
                    case 'date-time':
                    case 'time':
                        return 'SuperDate';
                    case 'radio':
                        return 'SuperRadio';
                    case 'checkbox':
                        return 'SuperCheckbox';
                    case 'textarea':
                        return 'SuperTextarea';
                    default:
                        return 'SuperText';
                }
            },
            getFieldProps(name, config) {
                const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
                
                return {
                    ...config,
                    items: hasKey(config, 'items') ? config.items.enum : config.enum,
                    value: hasKey(this.values, name) ? this.values[name] : null,
                    label: hasKey(config, 'title') ? config.title : _.capitalize(name),
                };
            }
        },
    }
</script>

<style scoped lang="scss">
    .form {
        display: block;

        &__text,
        &__number,
        &__select,
        &__checkboxes,
        &__checkbox,
        &__date {
            display: block;
        }
    }
</style>