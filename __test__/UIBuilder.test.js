/**
 * @jest-environment jsdom
 */
import { addImageToDiv, appendTrip, clearDiv } from '../src/client/js/UIBuilder';

describe('UIBuilder.js tests', () => {
    document.body.innerHTML = `
        <div id="test-div"></div>
        <div id="container-div"></div>
    `;

    test('addImageToDiv adds an img element to the target div', () => {
        addImageToDiv('test-div', 'https://example.com/image.jpg');
        const divElement = document.getElementById('test-div');
        const imgElement = divElement.querySelector('img');

        expect(imgElement).not.toBeNull();
        expect(imgElement.src).toBe('https://example.com/image.jpg');
    });

    test('appendTrip appends the trip HTML to the container', () => {
        const tripName = 'Test Trip';
        const maxTemp = '30°C';
        const minTemp = '20°C';
        const description = 'Sunny';
        const imageUrl = 'https://example.com/trip.jpg';
        const dateInput = '2024-07-01';

        appendTrip('container-div', tripName, maxTemp, minTemp, description, imageUrl, dateInput);
        const containerElement = document.getElementById('container-div');
        const tripElement = containerElement.querySelector('.trip');

        expect(tripElement).not.toBeNull();
        expect(tripElement.querySelector('h3').textContent).toBe(tripName);
        expect(tripElement.querySelector('div').textContent).toContain('Date: ' + dateInput);
        expect(tripElement.querySelector('img').src).toBe(imageUrl);
    });

    test('appendTrip appends the trip HTML without temperature', () => {
        const tripName = 'Test Trip No Temp';
        const imageUrl = 'https://example.com/trip.jpg';
        const dateInput = '2024-07-01';

        appendTrip('container-div', tripName, undefined, undefined, undefined, imageUrl, dateInput);
        const containerElement = document.getElementById('container-div');
        const tripElements = containerElement.querySelectorAll('.trip');
        const lastTripElement = tripElements[tripElements.length - 1];

        expect(lastTripElement).not.toBeNull();
        expect(lastTripElement.querySelector('h3').textContent).toBe(tripName);
        expect(lastTripElement.querySelector('div').textContent).toContain('Date: ' + dateInput);
        expect(lastTripElement.querySelector('img').src).toBe(imageUrl);
    });

    test('clearDiv clears all child nodes within the container', () => {
        clearDiv('container-div');
        const containerElement = document.getElementById('container-div');

        expect(containerElement.children.length).toBe(0);
    });
});
