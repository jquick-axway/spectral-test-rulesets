// Checks if the API spec is assigned the "Apache" license.

module.exports = (input) => {
    if (!input || !input.toLowerCase().includes('apache')) {
        return [{ message: 'License field must be set to "Apache".' }];
    }
};
