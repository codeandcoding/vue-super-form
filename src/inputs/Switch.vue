<template>
    <label :class="switchClass">
        <span>{{ this.label }}</span>
        <div 
            :name="name"
            v-on:click="e => this.onChange(!inputValue)"
        />
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';
    import { validationMixin } from '../validationHelper';

    export default {
        name: 'SuperSwitch',
        mixins: [validationMixin],
        props: inputProps,
        data() {
            return {
                inputValue: this.value,
            }
        },
        computed: {
            switchClass() {           
                return this.value ?
                    'form__switch' : 'form__switch form__switch--off';
            }
        },

        methods: {
            onChange(value) {
                this.inputValue = value;
                this.$emit('onChange', this.name, value);
            }
        }
    }
</script>

<style lang="scss">
    .form {
        &__switch {
            & > div:nth-of-type(1) {
                background-color: green;
                width: 100px;
                height: 30px;
            }

            &--off {
                & > div:nth-of-type(1) {
                    background-color: red;
                }
            }
        }
    }
</style>