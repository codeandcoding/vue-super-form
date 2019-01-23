<template>
    <label class="form__select">
        <span>{{ this.label }}</span>
        <select :name="name" v-on:input="e => this.change(e.target.value)">
            <option
                v-for="option in selectItems"
                :key="option.value"
                :value="option.value"
                :selected="option.value == inputValue"
                :disabled="option.value == null">
            {{ option.label }}
            </option>
        </select>
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperSelect',
        mixins: [validationMixin, formSchemaMixin],
        props: {
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
        },
        computed: {
            defaultValue() {
                return this.default ? this.default : this.items[0];
            },
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
                    label: this.placeholder || this.label,
                }, items);
            },
        },
        methods: {
            change(val) {
                const value = this.type === 'number' ? parseInt(val) : val;
                this.onChange(value);
            }
        },
    }
</script>

<style lang="scss">
</style>