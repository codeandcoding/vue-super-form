<template>
    <label class="form__select" @click="toggleDropdown" @mouseleave="closeDropdown" @mouseenter="preventClose">
        <span>{{ this.label }}</span>
        <ul v-if="isOpen" class="form__select-options">
            <li
                v-for="option in selectItems"
                v-html="render && option.value != null ? render(option) : option.label"
                :class="option.value == inputValue ? 'selected' : null"
                :key="option.value"
                @click="() => option.value != null ? change(option.value) : () => {}"
                :value="option.value"
                :selected="option.value == inputValue"
                :disabled="option.value == null" />
        </ul>
        <div class="form__select-value">
            {{ displayValue }}
        </div>
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
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
            render: {
                type: Function,
                required: false,
            }
        },
        data() {
            return {
                isOpen: false,
                closingTimeout: null,
            };
        },
        computed: {
            defaultValue() {
                return this.default || null;
            },
            selectItems() {
                const getLabel = (key) => this.itemLabels && 
                    Object.prototype.hasOwnProperty.call(this.itemLabels, key) ? this.itemLabels[key] : key;
                const items = this.items.map(item => ({
                    value: _.camelCase(item),
                    label: getLabel(item),
                }));

                // add default item
                return _.concat({
                    value: null,
                    label: this.placeholder || this.label,
                }, items);
            },
            displayValue() {
                const value = this.inputValue || null;
                const selected = this.selectItems.filter(item => item.value === value);
                return selected.length > 0 ? selected[0].label : value;
            }
        },
        methods: {
            change(val) {
                const value = this.type === 'number' ? parseInt(val) : val;
                this.onChange(value);
            },
            toggleDropdown() {
                this.isOpen = !this.isOpen;
            },
            closeDropdown() {
                this.closingTimeout = setTimeout(() => {
                    this.isOpen = false;
                }, 800);
            },
            preventClose() {
                if (this.closingTimeout) {
                    // cancel closing of dropdown
                    clearTimeout(this.closingTimeout);
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .form__select {
        position: relative;
    }

    .form__select-options,
    .form__select-value {
        border: 1px solid grey;
        padding: 1em;
        margin: 0;
        width: 200px;
        cursor: pointer;
        min-height: 3.5em;
    }

    .form__select-options {
        list-style: none;
        position: absolute;
        background-color: #fff;
        padding: 0;
        z-index: 90;

        > li {
            display: block;
            padding: 1em;

            &:hover {
                background-color: lightgray;
            }

            &.selected {
                color: grey;
                cursor: default;
            }
        }
    }
</style>