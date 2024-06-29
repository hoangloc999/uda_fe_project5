// UIBuilder.test.js
import { addImageToDiv, appendTrip, clearDiv } from '../src/client/js/UIBuilder';

describe('addImageToDiv', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="test-div"></div>';
    });

    test('adds an image to the specified div', () => {
        const divId = 'test-div';
        const imgUrl = 'https://example.com/image.jpg';
        addImageToDiv(divId, imgUrl);
        const imgElement = document.querySelector(`#${divId} img`);

        expect(imgElement).not.toBeNull();
        expect(imgElement.src).toBe(imgUrl);
    });
});

describe('appendTrip', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="trip-container"></div>';
    });

    test('appends trip details to the container', () => {
        const containerId = 'trip-container';
        const tripName = 'Trip to Paris';
        const maxTemp = 25;
        const minTemp = 15;
        const description = 'A wonderful trip to Paris.';
        const imageUrl = 'https://example.com/paris.jpg';
        const dateInput = '2024-07-01';

        appendTrip(containerId, tripName, maxTemp, minTemp, description, imageUrl, dateInput);
        const tripElement = document.querySelector(`#${containerId} .trip`);

        expect(tripElement).not.toBeNull();
        expect(tripElement.querySelector('h3').textContent).toBe(tripName);
        expect(tripElement.querySelector('div:nth-child(2)').textContent).toBe(`Date: ${dateInput}`);
        expect(tripElement.querySelector('div:nth-child(3)').textContent).toBe(`Max temp: ${maxTemp}`);
        expect(tripElement.querySelector('div:nth-child(4)').textContent).toBe(`Min temp: ${minTemp}`);
        expect(tripElement.querySelector('div:nth-child(5)').textContent).toBe(`Description: ${description}`);
        expect(tripElement.querySelector('img').src).toBe(imageUrl);
    });

    test('appends trip details without temperature to the container', () => {
        const containerId = 'trip-container';
        const tripName = 'Trip to Paris';
        const imageUrl = 'https://example.com/paris.jpg';
        const dateInput = '2024-07-01';

        appendTrip(containerId, tripName, undefined, undefined, undefined, imageUrl, dateInput);
        const tripElement = document.querySelector(`#${containerId} .trip`);

        expect(tripElement).not.toBeNull();
        expect(tripElement.querySelector('h3').textContent).toBe(tripName);
        expect(tripElement.querySelector('div:nth-child(2)').textContent).toBe(`Date: ${dateInput}`);
        expect(tripElement.querySelector('img').src).toBe(imageUrl);
    });
});

describe('clearDiv', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="clear-container">
                <div>Child 1</div>
                <div>Child 2</div>
            </div>
        `;
    });

    test('clears all child elements from the container', () => {
        const containerId = 'clear-container';
        clearDiv(containerId);
        const containerElement = document.getElementById(containerId);

        expect(containerElement.children.length).toBe(0);
    });
});
