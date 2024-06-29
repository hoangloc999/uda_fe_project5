// helper.test.js
import { getDifferenceInDays, getCurrentDate } from '../src/client/js/helper';

describe('getDifferenceInDays', () => {
    test('calculates the difference between two dates correctly', () => {
        const date1 = '2024-06-01';
        const date2 = '2024-06-10';
        const result = getDifferenceInDays(date1, date2);
        expect(result).toBe(9);
    });

    test('returns 0 when the same date is provided', () => {
        const date1 = '2024-06-01';
        const date2 = '2024-06-01';
        const result = getDifferenceInDays(date1, date2);
        expect(result).toBe(0);
    });

    test('calculates the difference between dates across months', () => {
        const date1 = '2024-05-25';
        const date2 = '2024-06-05';
        const result = getDifferenceInDays(date1, date2);
        expect(result).toBe(11);
    });
});

describe('getCurrentDate', () => {
    test('returns the current date in YYYY-MM-DD format', () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const expectedDate = `${year}-${month}-${day}`;

        const result = getCurrentDate();
        expect(result).toBe(expectedDate);
    });
});
