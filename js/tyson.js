// CWB-BD11F051-48B5-4195-96EE-757A1147B8DD


const ReportWeather =()=>{
    // const apikey = 'CWB-BD11F051-48B5-4195-96EE-757A1147B8DD'
    // const limit = 10
    // const format = 'JSON'
    // WeatherAPI = `https://opendata.cwb.gov.tw/fileapi/v1/rest/datastore/O-A0005-001?Authorization=${apikey}&limit=${limit}&format=${format}`
    const WeatherAPI = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-BD11F051-48B5-4195-96EE-757A1147B8DD&limit=10&offset=0&format=JSON'
    fetch(WeatherAPI)
    .then(res => res.json())
    .then(data =>{
        console.log(data.records.weatherElement.location[0].value)
        let location = ['嘉義','臺中','澎湖','宜蘭','金門']
        let tyson = document.querySelector('.tyson')
        let newH3 = document.createElement('h3')
        tyson.appendChild(newH3)
        newH3.innerText = '天氣紫外線預測'
        let information = document.createElement('div')
        information.classList.add('information')
        for(let i=0 ; i<5 ;i++){
            let newLoc = document.createElement('p')
            newLoc.innerText = location[i]
            let newP = document.createElement('p')
            newP.innerText = data.records.weatherElement.location[i].value
            let newImg = document.createElement('img')
            // newImg.src = './img/weather.jpg'
            newImg.src = 'https://nash15963.github.io/team_2_practice/img/weather.jpg'
            let newDiv = document.createElement('div')
            newDiv.classList.add('information')
            newDiv.appendChild(newLoc)
            newDiv.appendChild(newP)
            newDiv.appendChild(newImg)
            tyson.appendChild(newDiv)
        }
    })
}
ReportWeather()


