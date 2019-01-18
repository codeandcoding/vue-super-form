<template>
    <label class="form__select">
        <span>{{ this.label }}</span>
        <select :name="name" v-on:input="e => this.onChange(e.target.value)">
            <option
                v-for="option in selectItems"
                :key="option.value"
                :value="option.value"
                :selected="option.value == value"
                :disabled="option.value == null">
            {{ option.label }}
            </option>
        </select>
    </label>
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
            itemLabels: {
                type: [Object, Array],
                required: false,
            },
        }, inputProps),
        computed: {
            selectItems() {
                const getLabel = (key) => this.itemLabels && 
                    Object.prototype.hasOwnProperty.call(this.itemLabels, key) ? this.itemLabels[key] : key;
                const items = this.items.map(item => ({
                    value: item,
                    label: getLabel(item),
                }));

                // add default item
                return _.concat({
                    value: null,
                    label: this.label,
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