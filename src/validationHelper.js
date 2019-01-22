import FieldError from './FieldError';

function validateField(rules, value) {
    const errors = [];

    Object.keys(rules).map(rule => {
        switch(rules[rule]) {
            case 'string':
                if (typeof value != 'string') {
                    errors.push('only_string_field')
                }
                if (rules.minLength) {
                    if (value.length < rules.min_length) {
                        errors.push('minimum_field')
                    }
                }
                if (rules.maxLength) {
                    if (value.length > rules.max_length) {
                        errors.push('maximum_field')
                    }
                }
                break;
            case 'required':
                if (!value || value.length < 1) {
                    errors.push('required_field')
                }
                break;
            case 'number':
                if (isNaN(value)) {
                    errors.push('only_number_field')
                }
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
            type: Object,
            required: false,
            default: () => [],
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