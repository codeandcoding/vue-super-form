export default {
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    placeholder: {
        type: String,
        required: false,
    },
    validation: {
        type: Object,
        required: false,
        default: () => ({}),
    },
    readonly: {
        type: Boolean,
        default: false,
    },
};