<template>
    <label :class="switchClass">
        <span>{{ this.label }}</span>
        <div :name="name"
            v-on:click="e => this.onChange(!inputValue)"
        />
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperSwitch',
        mixins: [validationMixin, formSchemaMixin],
        computed: {
            defaultValue() {
                return false;
            },
            switchClass() {           
                return this.inputValue ?
                    'form__switch' : 'form__switch form__switch--off';
            }
        }
    }
</script>

<style lang="scss">
    .form {
        &__switch {
            > div:first-of-type {
                background-color: green;
                width: 100px;
                height: 30px;
            }

            &--off {
                > div:first-of-type {
                    background-color: red;
                }
            }
        }
    }
</style>