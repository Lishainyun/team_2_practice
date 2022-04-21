"use strict"

let weatherData = [];
let weatherCondition = ["晴","陰","雨"]
let getWeatherCondition = []

let yun = document.querySelector('.yun')
let title = document.createElement('div')
let select = document.createElement('select')
let btn = document.createElement('button')
let response = document.createElement('div')
let reminder = document.createElement('div')
let gifATag = document.createElement('a')
let gif = document.createElement('img')
yun.appendChild(title)
yun.appendChild(select)
yun.appendChild(btn)
yun.appendChild(response)
yun.appendChild(reminder)
yun.appendChild(gifATag)
gifATag.appendChild(gif)
title.textContent = '天氣預報暨社畜激勵語錄'
select.id = 'selectLocation'
btn.type = 'button'
btn.id = 'selectBtn'
btn.textContent = '查詢'
yun.style = 'text-align:center'
title.style = 'font-size:24px;margin:12px'
select.style = 'margin:6px'
response.style = 'margin-top:12px'
reminder.setAttribute('class','reminder')

async function getData(url){
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

getData("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-AA57B9D9-B1FC-4796-9966-65C1362321AD&format=JSON")
.then((response)=>{
    let data = response.records.location
    let dataLength = data.length

    // 新增HTML Select Element and Button
    for(let i = 0; i < dataLength; i++){

        let locaName = data[i].locationName
        let options = document.createElement('option')
  
        select.appendChild(options)
        options.textContent = locaName
        options.class = i

    }

    // 獲得所需資訊
    for(let i = 0; i < dataLength; i++){

        let locaName = data[i].locationName
        let weatherDescription = data[i].weatherElement[0].time[0].parameter.parameterName
        let weatherStartTime = data[i].weatherElement[0].time[0].startTime
        let weatherEndTime = data[i].weatherElement[0].time[0].endTime
        weatherData.push([locaName,{
            "weatherDescription":weatherDescription,
            "weatherStartTime":weatherStartTime,
            "weatherEndTime":weatherEndTime
        }])

    }
})

function showData(){
    let getSelectedLocation = selectLocation.value
    let conditionResult = ""
    response.textContent = ""
    for(let i = 0; i < weatherData.length; i++){
        if (getSelectedLocation === weatherData[i][0]){
            response.textContent = weatherData[i][1].weatherStartTime+" ~ "+weatherData[i][1].weatherEndTime+" "+weatherData[i][1].weatherDescription          
            getWeatherCondition[0] = weatherData[i][1].weatherDescription
        }
    }

    // 解決多雲及雨同時出現的衝突
    if(getWeatherCondition[0].indexOf("雨") > -1){
        getWeatherCondition[0] = "雨"
    }else if(getWeatherCondition[0].indexOf("多雲") === 0){
        getWeatherCondition[0] = "陰"
    }
    for(let i = 0; i < weatherCondition.length; i++){
        if(getWeatherCondition[0].indexOf(weatherCondition[i]) === 0){
            console.log(weatherCondition[i])
            conditionResult = weatherCondition[i]
        }
    }

    if (conditionResult === "晴"){
        reminder.textContent = "牆外天氣不錯，加油!再上班18小時就可以見到外面的陽光了:)"
        gifATag.setAttribute('href', 'https://imgur.com/QNfyj92')
        gif.setAttribute('src', 'https://i.imgur.com/QNfyj92.gif')
    } else if (conditionResult === "陰"){
        reminder.textContent = "牆外天氣陰陰的，就像社畜的未來，但生活還是要過下去:)"
        gifATag.setAttribute('href', 'https://imgur.com/ZNlUBFk')
        gif.setAttribute('src', 'https://i.imgur.com/ZNlUBFk.jpg')
    } else {
        reminder.textContent = "感謝牆外的天空代替社畜流淚，社畜要省起來用在工作上:)"
        gifATag.setAttribute('href', 'https://imgur.com/WY8fDyT')
        gif.setAttribute('src', 'https://i.imgur.com/WY8fDyT.jpg')
    }
}

document.getElementById('selectBtn').addEventListener('click', showData)