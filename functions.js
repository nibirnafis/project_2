import { countryHTML, showEight, displayAllCountries } from "./utilities.js"


const continentsNode = document.querySelectorAll('#continents-container div')
const continentsArray = [...continentsNode]

const res = await fetch('countries.json')
const allData = await res.json()

const sortedCountriesName = allData.map(data => data.country).sort()
const sortedData = sortedCountriesName.map(countryName => {
    const country = allData.find(data => data.country === countryName)
    return country
})


async function currentTime(){

    continentsArray.map(continent => continent.innerHTML = `
        <p class="continent-name">${continent.id}</p>
        <div class="full-country-container">
            <div class="country-details">
                <div>Flag</div>
                <div>Country</div>
                <div>Day</div>
                <div>Time</div>
            </div>
            <div id="${continent.id}-country-container" class="country-container"></div>
            <button class='show-all-btn'>Show All ></button>
        <div>
    `)


    const d = new Date()
    const utcHours = d.getUTCHours()
    const utcMinutes = d.getUTCMinutes()

    const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]    


    sortedData.map(data => {
        const currentHours = utcHours + data.timeOffset

        const utcDay = days[d.getUTCDay()]

        const countryContainer = document.getElementById(`${data.continent}-country-container`)
        const country = document.createElement('div')
        country.classList.add("country")
        country.id = `${data.country}`


        if(Number.isInteger(currentHours)){

            if(currentHours >= 24){
                const adjustedCurrentHours = (currentHours - 24).toString().padStart(2, '0')
                const adjustedUtcDay = ( utcDay === "Sat" ? days[0] : days[d.getUTCDay() + 1] )
                country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, adjustedCurrentHours, utcMinutes.toString().padStart(2, '0'))
                countryContainer.append(country)
            }

            else if(currentHours < 0){
                const adjustedCurrentHours = (24 + currentHours).toString().padStart(2, '0')
                const adjustedUtcDay = ( utcDay === "Sun" ? days[days.length - 1] : days[d.getUTCDay() - 1] )
                country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, adjustedCurrentHours, utcMinutes.toString().padStart(2, '0'))
                countryContainer.append(country)
            }

            else{
                country.innerHTML = countryHTML(data.flag, data.country, utcDay, currentHours.toString().padStart(2, '0'), utcMinutes.toString().padStart(2, '0'))
                countryContainer.append(country)
            }
        }
        
        

        else{
            const hours = Math.trunc(currentHours)
            const minutes = (currentHours - hours).toPrecision(2) * 100
            const currentMinutes = utcMinutes + minutes


            if(hours >= 24){
                const adjustedCurrentHours = hours - 24
                const adjustedUtcDay = ( utcDay === "Sat" ? days[0] : days[d.getUTCDay() + 1] )
                if(currentMinutes >= 60){
                    const readjustedCurrentHours = adjustedCurrentHours + 1
                    const adjustedCurrentMinutes = currentMinutes - 60
                    country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, readjustedCurrentHours.toString().padStart(2, '0'), adjustedCurrentMinutes.toString().padStart(2, '0'))
                    countryContainer.append(country)
                }
                else{
                    country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, adjustedCurrentHours.toString().padStart(2, '0'), currentMinutes.toString().padStart(2, '0'))
                    countryContainer.append(country)
                }
            }
            
            
            else if(hours < 0){
                const adjustedCurrentHours = 24 + hours
                const adjustedUtcDay = ( utcDay === "Sun" ? days[days.length - 1] : days[d.getUTCDay() - 1] )
                if(currentMinutes >= 60){
                    const readjustedCurrentHours = ( adjustedCurrentHours == 23 ? 0 : hours + 1 )
                    const adjustedCurrentMinutes = currentMinutes - 60
                    country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, readjustedCurrentHours.toString().padStart(2, '0'), adjustedCurrentMinutes.toString().padStart(2, '0'))
                    countryContainer.append(country)
                }
                else{
                    country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, adjustedCurrentHours.toString().padStart(2, '0'), currentMinutes.toString().padStart(2, '0'))
                    countryContainer.append(country)
                }
            }


            else{
                if(currentMinutes >= 60){
                    const adjustedCurrentHours = ( hours == 23 ? 0 : hours + 1 )
                    const adjustedCurrentMinutes = currentMinutes - 60
                    const adjustedUtcDay = ( 
                        hours == 23 ? 
                        days[( utcDay === "Sat" ? 0 : (d.getUTCDay() + 1))] 
                        : 
                        days[d.getUTCDay()] 
                    )
                    country.innerHTML = countryHTML(data.flag, data.country, adjustedUtcDay, adjustedCurrentHours.toString().padStart(2, '0'), adjustedCurrentMinutes.toString().padStart(2, '0'))
                    countryContainer.append(country)
                }
                else{
                    country.innerHTML = countryHTML(data.flag, data.country, utcDay, hours.toString().padStart(2, '0'), currentMinutes.toString().padStart(2, '0'))
                    countryContainer.append(country)
                }
            }
        }
    })
    showEight()
    displayAllCountries()
}

currentTime()

setInterval(currentTime, 60000)



































/* const timesContainer = document.getElementById('timesContainer')

async function currentTime(){

    timesContainer.innerHTML = ""

    const d = new Date()
    const utcHours = d.getUTCHours()
    const utcMinutes = d.getUTCMinutes()
    const utcSeconds = d.getUTCSeconds()

    const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]    

    const res = await fetch('/countries.json')
    const allData = await res.json()
    

    allData.map(data => {
        const currentHours = utcHours + data.timeOffset
        const utcDay = days[d.getUTCDay()]

        if(currentHours >= 24){
            const adjustedCurrentHours = currentHours - 24
            const country = document.createElement('div')
            country.classList.add("country")
            country.innerHTML = `
                <img class="flag" src="${data.flag}" alt="">
                <div>${data.country}</div>
                <div>${utcDay}</div>
                <div class="time">
                    <div>${adjustedCurrentHours}:</div>
                    <div>${utcMinutes}</div>
                </div>
            `
            timesContainer.append(country)
        }

        else if(currentHours < 0){
            const adjustedCurrentHours = 24 + currentHours
            const utcDay = days[d.getUTCDay() - 1]
            const country = document.createElement('div')
            country.classList.add("country")
            country.innerHTML = `
                <img class="flag" src="${data.flag}" alt="">
                <div>${data.country}</div>
                <div>${utcDay}</div>
                <div class="time">
                    <div>${adjustedCurrentHours}:</div>
                    <div>${utcMinutes}</div>
                </div>
            `
            timesContainer.append(country)
        }

        else{
            const country = document.createElement('div')
            country.classList.add("country")
            country.innerHTML = `
                <img class="flag" src="${data.flag}" alt="">
                <div>${data.country}</div>
                <div>${utcDay}</div>
                <div class="time">
                    <div>${currentHours}:</div>
                    <div>${utcMinutes}</div>
                </div>
            `
            timesContainer.append(country)
        }
    }
)

}

currentTime()

setInterval(currentTime, 60000)
 */
