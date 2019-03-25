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
            <span v-if="i > 0 && renderRemove" @click="() => removeInput(i)" v-html="renderRemove()"/>
            <span v-else-if="i > 0" @click="() => removeInput(i)">X</span>
        </span>
        <a :class="buttonClass" @click="addInput">
            <span v-if="renderAdd" v-html="renderAdd()" />
            <span v-else >Add</span>
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
            renderAdd: {
                type: Function,
                required: false,
            },
            renderRemove: {
                type: Function,
                required: false,
            },
        },
        data() {
            return {
                inputs: [],
            };
        },
        mounted() {
            this.inputs = this.inputValue && this.inputValue.length > 0 ? 
                this.inputValue.map((val, i) => ({ value: val, key: `input-${i}` })) :
                [{ value: '', key: 'input-0' }];
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
                return lastValue && lastValue.value.length > 0;
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
            addInput() {
                if (!this.canAddField) {
                    return;
                }

                const index = this.inputs.length;
                this.inputs.push({ value: '', key: `input-${index}` })
            },
            removeInput(index) {
                if (!this.inputs[index]) {
                    return;
                }

                this.inputs.splice(index, 1);
                this.onChange(this.inputs.map(i => i.value));
            }
        }
    }
</script>

<style lang="scss">
</style>