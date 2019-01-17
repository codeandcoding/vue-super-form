<template>
    <div>
        <super-form :schema="exampleSchema" v-model="formData" />
        <pre>
            {{ formData }}
        </pre>
    </div>
</template>

<script>
    import exampleSchema from './example.json';

    export default {
        name: 'App',
        data () {
            return {
                exampleSchema,
                formData: {
                    name: 'John Doe',
                    numberSelect: 2,
                    checkboxes: [
                        'foo', 'fuzz'
                    ],
                    numberRadio: null,
                    birthdate: '2018/12/01'
                },
            }
        },
        mounted() {
            console.log('example app mounted!');
        }
    };
</script>

<style lang="scss">
</style>