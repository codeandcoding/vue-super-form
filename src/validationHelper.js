import FieldError from './FieldError';

function validateField(rules, value) {
    const errors = [];
    console.log(rules);
    rules.map((rule) => {
        switch(rule) {
            case 'required':
                if (!value || value.length < 1) {
                    errors.push('required_field')
                }
                break;
            case 'number':
                if (isNaN(value)) {
                    errors.push('number_field')
                }
            break;
            case 'minimum':
                console.log(rules);
            
        }
    });

    return errors;
}

export const validationMixin = {
    components: {
        FieldError,
    },
    props: {
        rules: {
            type: Array,
            required: false,
            default: [],
        },
    },
    data() {
        return {
            validationErrors: [],
        }
    },
    methods: {
        validate() {
            this.validationErrors = validateField(this.rules, this.inputValue);
            return this.validationErrors.length > 0;
        }
    }
}