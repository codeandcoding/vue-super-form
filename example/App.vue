<template>
    <div class="wrapper">
        <pre>
            {{ formData }}
        </pre>
        <div>
            <super-form ref="form" :schema="exampleSchema" v-model="formData" :translations="translations" :render="renderFuncs"/>
            <input type="submit" value="Submit form" @click="submit" />
        </div>
    </div>
</template>

<script>
    import exampleSchema from './example.json';
    import translations from './en.json';

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
                    numberRadio: 1,
                    birthdate: '2018-12-01',
                },
                translations: translations.forms,
            }
        },
        computed: {
            renderFuncs() {
                return {
                    choice: val => {
                        return `<b>${val.label}</b>`;
                    }
                }
            }
        },
        mounted() {
            console.log('example app mounted!');
        },
        methods: {
            submit(e) {
                e.preventDefault();
                const formIsValid = this.$refs.form.validate();
                console.warn(formIsValid);
            }
        },
    };
</script>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 100%;
        width: 80%;
        margin: 0 auto;
        overflow: hidden;

        > * {
            flex: 1;
        }

        > pre {
            flex: 0.5;
        }

        > div {
            overflow: auto;

            input[type=submit] {
                margin: 1em 0 2em;
            }
        }
    }
</style>