<template>
    <div class="form__multi">
        <span>{{ this.label }}</span>
        <div v-for="item in inputValue" :key="item.key"> 
            <component
                :value="item.value"
                :identifier="item.key"
                :isMulti=true
                :is="itemType"
                v-bind="item.props"
                :index="item.index"
                v-on:onChange="change"
                :name="item.name" />
            <button @click="e => removeInput(e, item.key)"/>
        </div>
        <input type="submit" value="Add New" v-on:click="e => addNew(e)">
        <field-error :errors="this.validationErrors" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import { SuperText } from '../';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';
    import _ from 'lodash';

    export default {
        name: 'SuperMulti',
        mixins: [validationMixin, formSchemaMixin],
        mounted() {            
            this.inputValue = this.inputValue ? this.inputValue.map((val, i) => 
                this.inputItemFormatter(val, i)
            ) : [];
        },
        computed: {
            defaultValue() {
                return ['df', 'nbjh'];
            },
            itemType() {
                return SuperText;
            }
        },
        methods: {
            change(name, value) {                
                let newItems = this.inputValue.map(item =>
                    item.name == name ? item['value'] = value: item['value']
                )

                this.$emit('onChange', this.name, newItems);                
            },
            addNew(e) {
                e.preventDefault();

                return this.inputValue[this.inputValue.length - 1].value.length > 0 &&
                    this.inputValue.push(this.inputItemFormatter('', this.inputValue.length));
                    this.$emit('onChange', this.name, this.inputValue.map( item => item.value ));                   
            },
            removeInput(e, identifier) {
                e.preventDefault();

                if (this.inputValue.length > 1) {
                    this.inputValue = this.inputValue.filter(item => item.key != identifier);
                    this.$emit('onChange', this.name, this.inputValue.map( item => item.value ));                
                }
            },
            inputItemFormatter(val, i) {
                return { 
                  key: Math.random().toString(36).substring(7), 
                  props: this.items, 
                  name: `${this.name}_${i}`,
                  value: val 
                }
            }
        },
    }
</script>

<style lang="scss">
</style>