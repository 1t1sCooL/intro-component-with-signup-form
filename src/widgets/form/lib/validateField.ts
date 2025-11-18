export const validateField = (name: string, value: string): string => {
    switch (name) {
        case 'firstName':
            return !value.trim() ? 'First Name cannot be empty' : '';
        case 'lastName':
            return !value.trim() ? 'Last Name cannot be empty' : '';
        case 'email': {
            if (!value.trim()) return 'This field is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Looks like this is not an email';
        }
        case 'password':
            if (!value) return 'Password cannot be empty';
            if (value.length < 8) return 'Password must be at least 8 characters';
            return '';
        default:
            return '';
    }
};