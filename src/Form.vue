<template>
    <div>
        <h1 class="form__title">{{ this.title }}</h1>
        <form class="form">
            <component
                v-for="field in fields"
                ref="fields"
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
    import { getFieldConfig, getFieldProps } from './schemaHelper';

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
        watch: { 
            schema(newVal, oldVal) {
                const newProps = Object.keys(newVal.properties);
                Object.keys(this.values)
                    .filter(key => newProps.indexOf(key) < 0)
                    .map(key => delete this.values[key])
            },
        },
        computed: {
            fields() {
                const fields = Object.keys(this.schema).length ? this.schema.properties : null;
                return fields ? Object.keys(fields).map((name) => {
                    const config = fields[name];

                    // add 'required' rule
                    if (this.schema.required.includes(name)) {
                        config.required = true;
                    }
                    
                    const props = getFieldProps(name, config, this.values, this.translations);
                    return getFieldConfig(name, config, props);
                }) : [];
            },
            title() {
                return this.schema.title;
            },
        },
        methods: {
            onChange(name, val) {
                this.values[name] = val;
                this.$emit('input', _.clone(this.values))
            },
            validate() {
                let isValid = true;
                this.$refs.fields.map((field) => {
                    if (field.validate && !field.validate()) {
                        isValid = false;
                    }
                });

                return isValid;
            }
        },
    }
</script>

<style lang="scss">
    .form {
        display: block;

        &__text,
        &__number,
        &__textarea,
        &__select,
        &__checkboxes,
        &__checkbox,
        &__radios,
        &__switch,
        &__date {
            display: block;
            margin: 2em 0;

        &__checkboxes,
        &__switch,
        &__radios {
            label > span {
                display: inline;
            }

            &:first-child {
                margin-top: 0;
            }

            > span {
                display: block;
                padding-bottom: 0.5em;
            }

            label > span {
                display: inline;
            }
        }

        &__checkbox > span {
            display: inline;
            padding-bottom: 0;
        }
    }

    fieldset {
        border: 0;
        padding: 0.5em 0 0;

        > label {
            &:not(:last-child) {
                padding-right: 1.5em;
            }

            input {
                margin-right: 1em;
            }
        }
    }
    }
</style>