function countryHTML(flag, country, day, hours, minutes){
    return `
        <img class="flag" src="${flag}" alt="">
        <div>${country}</div>
        <div>${day}</div>
        <div class="time">
            <div>${hours}:</div>
            <div>${minutes}</div>
        </div>
    `
}


function showEight(){
    const countryContainersNode = document.querySelectorAll('.country-container')
    const countryContainersArray = [...countryContainersNode]

    countryContainersArray.map(container => {
        const countriesNode = container.childNodes
        const countriesArray = [...countriesNode]

        countriesArray.map(country => {
            if(countriesArray.indexOf(country) > 7){
                country.classList.replace('country', 'hideCountries')
            }
        })
    })
}



function displayAllCountries(){
    const btnsNode = document.querySelectorAll('.show-all-btn')
    const btnsArray = [...btnsNode]

    btnsArray.map(showBtn => {
        const continent = showBtn.parentNode
        const countriesNode = showBtn.previousElementSibling.childNodes
        const countriesArray = [...countriesNode]
        
        
        showBtn.addEventListener('click', () => {
            if(showBtn.innerText === "Show All >"){
                countriesArray.map(country => {
                    if(country.classList.value === "hideCountries"){
                        country.classList.replace('hideCountries', 'country')
                    }
                })
                showBtn.innerText = "< Show Less"
                continent.classList.add("pop")
            }

            else if(showBtn.innerText === "< Show Less"){
                countriesArray.map(country => {
                    if(countriesArray.indexOf(country) > 7){
                        country.classList.replace('country', 'hideCountries')
                    }
                })
                showBtn.innerText = "Show All >"
                continent.classList.remove("pop")
            }
        })
    })
}


export { countryHTML, showEight, displayAllCountries }