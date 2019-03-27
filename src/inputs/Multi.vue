<template>
    <label :class="labelClass">
        <span>{{ this.label }}</span>
        <span 
            v-for="(item, i) in inputs" 
            :key="item.key" 
            class="form__multi-field">
            <input
                v-on:input="e => change(item.key, e.target.value)" 
                :value="item.value"
                :disabled="readOnly"
                :type="type"
                :id="id"
                :name="name" />
            <span v-if="i > 0" @click="e => removeInput(e, i)">
                <component v-if="removeButton" :is="removeButton" />
                <button v-else >X</button>
            </span>
        </span>
        <a :class="buttonClass" @click="e => addInput(e)">
            <component v-if="addButton" :is="addButton" />
            <button v-else >Add</button>
        </a>
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperMulti',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            id: {
                String,
                required: false
            },
            addButton: {
                type: Object,
                required: false,
            },
            removeButton: {
                type: Object,
                required: false,
            },
        },
        data() {
            return {
                inputs: [],
                fieldIndex: 0,
            };
        },
        mounted() {
            this.inputs = this.inputValue && this.inputValue.length > 0 ? 
                this.inputValue.map((val, i) => ({ value: val, key: this.fieldKey() })) :
                [{ value: '', key: this.fieldKey() }];
        },
        computed: {
            labelClass() {
                const className = 'form__multi';
                return this.readOnly ? `${ className } ${ className }--disabled` : className;
            },
            buttonClass() {
                const className = 'form__multi-add';
                return !this.canAddField ? `${ className } ${ className }--disabled` : className;
            },
            canAddField() {
                const lastValue = this.inputs[this.inputs.length - 1];
                return !this.readOnly && lastValue && lastValue.value.length > 0;
            },
            defaultValue() {
                return [];
            },
            type() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'type') ?
                    this.ui.type : null;
            },
        },
        methods: {
            change(key, val) {
                const input = this.inputs.find(i => i.key === key);
                input.value = val;

                this.onChange(this.inputs.map(i => i.value));
            },
            addInput(e) {
                e.preventDefault();

                if (!this.canAddField) {
                    return;
                }

                const index = this.inputs.length;
                this.inputs.push({ value: '', key: this.fieldKey() })
            },
            removeInput(e, index) {
                e.preventDefault();
                
                if (!this.inputs[index] || this.readOnly) {
                    return;
                }

                this.inputs.splice(index, 1);
                this.onChange(this.inputs.map(i => i.value));
            },
            fieldKey() {
                this.fieldIndex++;
                return `input-${this.fieldIndex-1}`;
            }
        }
    }
</script>

<style lang="scss">
</style>