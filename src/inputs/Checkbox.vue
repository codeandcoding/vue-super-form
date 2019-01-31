<template>
    <div v-if="items" class="form__checkboxes">
        <!-- multiple checkboxes -->
        <span>{{ this.label }}</span>
        <fieldset>
            <label v-for="item in selectItems" :key="item.value">
                <input
                    type="checkbox"
                    :name="name"
                    :checked="inputValue && inputValue.includes(item.value)"
                    v-on:input="e => change(item.value, e.target.checked)" />
                <span>{{ item.label }}</span>
            </label>
        </fieldset>
        <field-error :errors="this.validationErrors" />
    </div>
    <label v-else class="form__checkbox">
        <!-- single checkbox -->
        <input
            type="checkbox" 
            :name="name" 
            v-on:input="e => change(null, e.target.checked)" />
        <span>{{ this.label }}</span>
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperCheckbox',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            items: {
                type: Array,
                required: false,
            },
            itemLabels: {
                type: Object,
                required: false,
            },
        },
        computed: {
            defaultValue() {
                return this.items && this.items.length ? [] : false;
            },
            selectItems() {
                const getLabel = (key) => this.itemLabels && 
                    Object.prototype.hasOwnProperty.call(this.itemLabels, key) ? this.itemLabels[key] : key;
                return this.items.map(item => ({
                    value: item,
                    label: getLabel(item),
                }));
            }
        },
        methods: {
            change(val, checked) {
                const value = val ? this.getMultiValues(val, checked) : checked;
                this.onChange(value);
            },
            getMultiValues(val, checked) {
                const values = this.value ? this.value.splice(0) : [];

                if (checked) {
                    values.push(val);
                } else {
                    const index = values.indexOf(val);
                    if (index > -1) {
                        values.splice(index, 1)
                    }
                }

                return _.uniq(values);
            },
        }
    }
</script>

<style lang="scss">
</style>