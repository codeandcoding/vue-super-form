<template>
    <label class="form__switch">
        <span>{{ this.label }}</span>
        <div 
            :class="switchClass"
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
        props: inputProps,
        data() {
            return {
                inputValue: this.value,
            }
        },
        computed: {
            switchClass() {           
                return this.value ?
                    'form__initial' : 'form__initial form__initial--inverse';
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
            &__initial {
                background-color: green;
                width: 100px;
                height: 30px;

                &--inverse {
                    background-color: red;
                }
            }
    }
</style>