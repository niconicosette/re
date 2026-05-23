const mockData = [];
const PAGE_SIZE = 5;
const LOCAL_STORAGE_KEY = 'calcount_mock_data';
let visibleEntryCount = PAGE_SIZE;

const saveMockData = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockData));
};

const loadMockData = async () => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
        return;
    }

    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
        return;
    }

    mockData.length = 0;
    data.forEach(item => {
        mockData.push(item);
    });
};

const populateTable = () => {
    const table = document.getElementById('calorieTable');
    const entryList = document.getElementById('entryList');
    if (!table || !entryList) {
        return;
    }

    const currentDate = new Date();
    const currentDotDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
    let todaysItem = mockData.find(item => item.date === currentDotDate) || null;
    const entriesToDisplay = mockData.slice(-visibleEntryCount);
    entryList.innerHTML = "";

    table.querySelectorAll('.controls').forEach(control => control.remove());

    entriesToDisplay.slice().reverse().forEach(item => {
        let content = "";
        let dailyTotal = 0;
        item.entries.forEach((entry, index) => {
            content += `<div class="entry" data-index="${index}"><input class="food" value="${entry.food}"><input class="calories" type="number" value="${entry.calories}"></div>`;
            dailyTotal += entry.calories;
        });
        const isTodaysDate = item.date === currentDotDate;
        entryList.innerHTML += `<form ${isTodaysDate ? 'id="today-form"' : ''}><fieldset ${isTodaysDate ? "" : "disabled"}><h3>${item.date}: <span class="dailyTotal">${dailyTotal}</span></h3>${content}</fieldset></form>`;
    });

    const allEntriesVisible = visibleEntryCount >= mockData.length;
    table.insertAdjacentHTML('afterbegin', `<div class="controls controls-top"><button id="add-entry">add</button> <button id="save" ${todaysItem ? '' : 'disabled'}>save</button></div>`);
    table.insertAdjacentHTML('beforeend', `<div class="controls controls-bottom"><button id="load-more" ${allEntriesVisible ? 'disabled' : ''}>load more</button></div>`);

    const loadMoreButton = document.getElementById('load-more');
    const addEntryButton = document.getElementById('add-entry');
    const saveButton = document.getElementById('save');
    loadMoreButton.addEventListener('click', (e) => {
        e.preventDefault();
        visibleEntryCount = Math.min(visibleEntryCount + PAGE_SIZE, mockData.length);
        populateTable();
    });

    addEntryButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (!todaysItem) {
            todaysItem = {
                date: currentDotDate,
                entries: []
            };
            mockData.push(todaysItem);

            const liveEntryList = document.getElementById('entryList');
            liveEntryList.insertAdjacentHTML('afterbegin', `<form id="today-form"><fieldset><h3>${currentDotDate}: <span class="dailyTotal">0</span></h3></fieldset></form>`);
            saveButton.disabled = false;
        }

        const form = document.querySelector('#today-form');
        if (!form) {
            return;
        }
        const fieldset = form.querySelector('fieldset');
        const entryCount = fieldset.querySelectorAll('.entry').length;
        fieldset.insertAdjacentHTML(
            'beforeend',
            `<div class="entry" data-index="${entryCount}"><input class="food" value=""><input class="calories" type="number" value=""></div>`
        );

        if (entryCount === 0) {
            fieldset.querySelector('h3').textContent = `${currentDotDate}: 0`;
        }
    });

    saveButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!todaysItem) {
            return;
        }

        const form = document.querySelector('#today-form');
        if (!form) {
            saveButton.disabled = true;
            return;
        }

        const fieldset = form.querySelector('fieldset');
        const entryRows = form.querySelectorAll('.entry');
        const updatedEntries = [];

        entryRows.forEach(row => {
            const index = Number(row.dataset.index);
            const foodValue = row.querySelector('.food').value.trim();
            const calorieValue = row.querySelector('.calories').value.trim();

            if (!foodValue && !calorieValue) {
                return;
            }

            const originalEntry = todaysItem.entries[index] || { food: '', calories: 0 };
            const parsedCalories = Number(calorieValue);
            updatedEntries.push({
                food: foodValue || originalEntry.food,
                calories: calorieValue === '' || Number.isNaN(parsedCalories) ? 0 : parsedCalories
            });
        });

        todaysItem.entries = updatedEntries;

        try {
            await saveMockData();
        } catch (error) {
            console.error(error);
        }

        let updatedContent = '';
        let updatedDailyTotal = 0;
        todaysItem.entries.forEach((entry, index) => {
            updatedContent += `<div class="entry" data-index="${index}"><input class="food" value="${entry.food}"><input class="calories" type="number" value="${entry.calories}"></div>`;
            updatedDailyTotal += entry.calories;
        });

        fieldset.innerHTML = `<h3>${todaysItem.date}: <span class="dailyTotal">${updatedDailyTotal}</span></h3>${updatedContent}`;
    });
};

window.onload = async function() {
    try {
        await loadMockData();
        visibleEntryCount = Math.min(PAGE_SIZE, mockData.length || PAGE_SIZE);
    } catch (error) {
        console.error(error);
    }

    populateTable();
};