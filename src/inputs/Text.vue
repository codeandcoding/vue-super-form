<template>
    <div class="text">
        <label>{{ label }}</label>
        <input :type="type" 
        v-model="superText"
        :id="id" 
        :placeholder="placeholder"
        :name="name" 
        :value="value"/> 
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'SuperText',
        data() {
            return {
                superText,
            };
        },
        props: {
            placeholder: { 
                String,
            },
            label: {
                String,
                required: false
            },
            name: {
                String,
                required: false
            },
            id: {
                String,
                required: true
            }, 
            value: {
                String,
                required: false
            },
            type: {
                validator: function (value) {
                    // The value must match one of these strings
                    return ['text', 'password'].indexOf(value) !== -1
                }
            }
        },
    }
</script>

<style lang="scss">
</style>