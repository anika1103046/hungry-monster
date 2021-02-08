function searchResult() {
    const searchTerm = document.getElementById("searchTerm").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals));
}

function displaySearchResult(searchResult) {
    let displayData = '';
    if(searchResult === null) {
        displayData = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Sorry!No meal found !
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
           
        `;
        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = displayData;
        displayData = '';
    }
    else {
        searchResult.forEach(meal => {
            displayData += `
                <div class="col-3">
                    <div class="card h-100" style="width: 20rem;" onClick="mealDetails(${meal.idMeal})">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body mealName">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        }) 
        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = displayData;
        displayData = '';
    }
}

function mealDetails(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]));
}

function displayMealDetails(meal) {
    
    let mealDetails = '';
    let ingredientList = '';
    const availableIngredients = [];

    for(var i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        
        if(ingredient) {
            availableIngredients.push(ingredient);
        }
    }

    for(var i = 0; i < availableIngredients.length; i++) {
        ingredientList += `
            <div>
                <label>${availableIngredients[i]}</label>
            </div>
        `
    }

    mealDetails = `
        <div class="row">
            <div class="col-6 offset-3">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2>${meal.strMeal}</h2>
                        <h4>Ingredients</h4>
                        ` + ingredientList + `
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById("mealDetails").innerHTML = mealDetails;
    mealDetails = '';
    ingredientList = '';
}