<template>
    <label class="form__radios">
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
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';
    import { validationMixin } from '../validationHelper';

    export default {
        name: 'SuperRadio',
        mixins: [validationMixin],
        props: _.assign({
            items: {
                type: Array,
                required: true,
            },
            itemLabels: {
                type: Object,
                required: false,
            },
        }, inputProps),
        data() {
            return {
                inputValue: this.value,
            }
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
        methods: {
            onChange(value) {
                this.inputValue = value;
                this.$emit('onChange', this.name, value);
            }
        }
    }
</script>

<style lang="scss">
</style>