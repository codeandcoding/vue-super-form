<template>
    <div class="form__radios">
        <span>{{ this.label }}</span>
        <fieldset>
            <label v-for="item in selectItems" :key="item.value">
                <input
                    type="radio"
                    :name="name"
                    :id="item.label"
                    :checked="inputValue == item.value"
                    v-on:input="e => onChange(item.value)" />
                <span>{{ item.label }}</span>
            </label>
        </fieldset>
        <field-error :errors="this.validationErrors" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperRadio',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            items: {
                type: Array,
                required: true,
            },
            itemLabels: {
                type: Object,
                required: false,
            },
        },
        computed: {
            selectItems() {
                const getLabel = (key) => this.itemLabels && 
                    Object.prototype.hasOwnProperty.call(this.itemLabels, key) ? this.itemLabels[key] : key;
                return this.items.map(item => ({
                    value: item,
                    label: getLabel(item),
                }));
            }
        },
    }
</script>

<style lang="scss">
</style>