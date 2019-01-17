<template>
    <select :name="name" v-on:input="e => this.onChange(e.target.value)">
        <option
            v-for="option in selectItems" 
            :key="option.value"
            :selected="option.value == value"
            :disabled="option.value == null">
        {{ option.label }}
        </option>
    </select>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperSelect',
        props: _.assign({
            items: {
                type: Array,
                required: true,
            },
            type: {
                type: String,
                required: false,
                default: 'string',
            },
        }, inputProps),
        computed: {
            selectItems() {
                const items = this.items.map(item => ({
                    value: item,
                    label: item,
                }));

                // add default item
                return _.concat({
                    value: null,
                    label: 'Choose one',
                }, items);
            }
        },
        methods: {
            onChange(val) {
                const value = this.type === 'number' ? parseInt(val) : val;
                this.$emit('onChange', this.name, value);
            }
        }
    }
</script>

<style lang="scss">
</style>