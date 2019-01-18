<template>
    <label class="form__text">
        <span>{{ this.label }}</span>
        <input 
            v-on:input="e => this.onChange(e.target.value)" 
            :value="inputValue"
            type="text"
            :id="this.id"
            :placeholder="this.placeholder"
            :name="this.name" />
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';
    import { validationMixin } from '../validationHelper';

    export default {
        name: 'SuperText',
        mixins: [validationMixin],
        props: _.assign({
            id: {
                String,
                required: false
            }
        }, inputProps),
        data() {
            return {
                inputValue: this.value,
            }
        },
        methods: {
            onChange(value) {
                this.inputValue = value;
                this.$emit('onChange', this.name, value);
            },
        },
    }
</script>

<style lang="scss">
</style>