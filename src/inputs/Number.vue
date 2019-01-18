<template>
    <label class="form__number">
        <span>{{ this.label }}</span>
        <input 
            type="number" 
            v-on:input="e => this.onChange(e.target.value)"
            :value="inputValue"
            :id="this.id"
            :placeholder="this.placeholder"
            :name="this.name"
            :min="this.minimum"
            :max="this.maximum"
            :readonly="this.readonly" />
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';
    import { validationMixin } from '../validationHelper';

    export default {
        name: 'SuperNumber',
        mixins: [validationMixin],
        props: _.assign({
            id: {
                String,
                required: false,
            },
            minimum: {
                Number,
                required: false,
            },
            maximum: {
                Number,
                required: false,
            },
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