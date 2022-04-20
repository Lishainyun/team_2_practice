const API_KEY = "CWB-B36B4A00-4384-432F-BA6C-983DC8F28D00";
const URL = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=${API_KEY}&limit=10&elementName=NOW&parameterName=CITY`;
const weiElement = document.querySelector(".wei");

let data = null;
async function getRainfallData () {
  const res = await fetch(URL);
  const result = await res.json();
  data = result;
}

function renderRainfallPage () {
  let weatherData = data.records.location;
  let tabletElement = document.createElement("table")
  tabletElement.setAttribute("align", "left")
  tabletElement.setAttribute("cellpadding", "15")
  tabletElement.setAttribute("cellspacing", "10")

  let captionElement = document.createElement("caption")
  captionElement.textContent = "降雨量"

  let trElementOne = document.createElement("tr")
  trElementOne.setAttribute("align", "left")
  let thElementOne = document.createElement("th")
  thElementOne.textContent = "觀測站"
  let thElemenTwo = document.createElement("th")
  thElemenTwo.textContent = "城市"
  let thElementThree = document.createElement("th")
  thElementThree.textContent = "觀測時間"
  let thElementFour = document.createElement("th")
  thElementFour.textContent = "本日累積雨量"
  trElementOne.append(thElementOne, thElemenTwo, thElementThree, thElementFour)
  tabletElement.append(captionElement, trElementOne)

  for(let item of weatherData){
    let locationName = item.locationName
    let city = item.parameter[0].parameterValue
    let obsTime = item.time.obsTime
    let rainFall = item.weatherElement[0].elementValue

    let trElementTwo = document.createElement("tr")

    let tdElementOne = document.createElement("td")
    tdElementOne.textContent = locationName
    let tdElementTwo = document.createElement("td")
    tdElementTwo.textContent = city
    let tdElementThree = document.createElement("td")
    tdElementThree.textContent = obsTime
    let tdElementFour = document.createElement("td")
    tdElementFour.textContent = `${rainFall}  mm`

    trElementTwo.append(tdElementOne, tdElementTwo, tdElementThree, tdElementFour)
    tabletElement.appendChild(trElementTwo)
  }
  weiElement.appendChild(tabletElement)
}

async function init(){
  await getRainfallData();
  renderRainfallPage();
}
init();


