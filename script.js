const mealNameInput = document.getElementById('input-meal');
const searchBtn = document.getElementById('search-btn');

// Search Button Event Handler
searchBtn.addEventListener('click', () => getMealsData(mealNameInput.value))

// Get Meals Data From API Function
const getMealsData = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => showMeals(data.meals))
}

// Show Meals Function
const showMeals = mealsData => {
    const mealsDetails = document.getElementById('meals-details');
    mealsDetails.innerHTML = '';
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    const nothingFound = document.getElementById('nothing-found');
    nothingFound.innerText = '';

    // Check Meals Data Or Nothing to show
    if (mealsData) {
        mealsData.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'col p-5';
            const mealInfo = `
                <div onclick="getDetails(${meal.idMeal})" class="card border-1 rounded-3 shadow cursor-prop" style="width: 18rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top">
                    <div class="card-body bg-light">
                        <h5 class="card-title text-center">${meal.strMeal}</h5>
                    </div>
                </div>
            `;
            mealDiv.innerHTML = mealInfo;
            mealsContainer.appendChild(mealDiv);
        });
    }
    else {
        nothingFound.innerText = `Sorry, No meals found for "${mealNameInput.value}" search result!`;
    }
}

// Function For Getting Details Of Meals
const getDetails = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealsDetails(data.meals[0]));
}

// Function For Display Details Of Meals
const displayMealsDetails = details => {
    const mealsDetails = document.getElementById('meals-details');
    mealsDetails.innerHTML = `
        <div class="d-flex justify-content-center mb-5">
            <div class="card w-75 border-1 rounded-3 shadow meal-details">
                <img src="${details.strMealThumb}" class="card-img-top">
                <div class="card-body bg-light">
                    <h1 class="mb-5">${details.strMeal}</h1>
                    <h5 class="card-text mb-5">Ingredients</h5>
                    <div id="ingredients">
                   </div>
                </div>
            </div>
        </div>
        `;
    const mealIngredients = document.getElementById('ingredients');

    // Because of API Gives Random Amount Of Ingredients, I've used for loop instead of for each.
    for (let i = 1; i <= 20; i++) {
        if (details['strIngredient' + i]) {
            const ingredient = document.createElement('p');
            ingredient.innerText = `${details['strMeasure' + i]} ${details['strIngredient' + i]}`;
            mealIngredients.appendChild(ingredient);
        }
    }
}