// Checks if title's words all start with an uppercase letter.

module.exports = (input) => {
    if (!input) {
        return;
    }

    for (const nextWord of input.replaceAll('-', ' ').split(' ')) {
        if (!/^[A-Z]*$/.test(nextWord.at(0))) {
            return [{ message: 'All words in title must start with uppercase letters.' }];
        }
    }
};
