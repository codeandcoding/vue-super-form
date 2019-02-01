<template>
    <label 
        :class="readonly ? 'form__select form__select--disabled' : 'form__select'"
        @click="toggleDropdown"
        @mouseleave="delayedClose" 
        @mouseenter="preventClose"
        v-click-outside="close">
        <span>{{ this.label }}</span>
        <ul v-if="isOpen" class="form__select-options">
            <li
                v-for="option in selectItems.filter(i => i.value)"
                v-html="render && option.value != null ? render(option) : option.label"
                :class="option.value == inputValue ? 'selected' : null"
                :key="option.value"
                @click="() => option.value != null ? change(option.value) : () => {}" />
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
                const parseValue = v => this.type === 'number' ? parseInt(v) : v;
                const getLabel = (key) => this.itemLabels && 
                    Object.prototype.hasOwnProperty.call(this.itemLabels, key) ? this.itemLabels[key] : key;
                const items = this.items.map(item => ({
                    value: parseValue(item),
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
                const selected = this.selectItems.filter(item => item.value == value);
                return selected.length > 0 ? selected[0].label : value;
            }
        },
        methods: {
            change(val) {
                const value = this.type === 'number' ? parseInt(val) : val;
                this.onChange(value);
            },
            toggleDropdown() {
                if (!this.readonly) {
                    this.isOpen = !this.isOpen;
                }
            },
            close() {
                this.isOpen = false;
            },
            delayedClose() {
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
        directives: {
            'click-outside': {
                bind: function (el, binding, vNode) {
                    el.__vueClickOutside__ = event => {
                        if (!el.contains(event.target)) {
                            // call method provided in v-click-outside value
                            vNode.context[binding.expression](event)
                            event.stopPropagation()
                        }
                    }
                    document.body.addEventListener('click', el.__vueClickOutside__)
                },
                unbind: function (el, binding, vNode) {
                    // remove event listeners
                    document.removeEventListener('click', el.__vueClickOutside__)
                    el.__vueClickOutside__ = null
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
        top: 100%;
        border-top: 0;
        background-color: #fff;
        max-height: 150px;
        overflow: auto;
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