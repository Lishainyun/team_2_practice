let url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0004-001?Authorization=CWB-52CB0E6E-075B-4C8D-A91C-786F724512F6&format=JSON'
fetch(url, {method:'GET'})
.then(response =>{
  return  response.json()
})
.then(data =>{
   console.log(data['records'])
   date = data['records']['weatherElement'].length - 1
   let poc_id  = document.querySelector('.poc');
   let h1 = document.createElement("h1");
   h1.id = "poc_h1" ;
   h1.className = "poc_h1" ;
   h1.innerText = data['records']['weatherElement'][date]['elementName'] ;
   poc_id.appendChild(h1);
   let title_div = document.createElement("div");
   title_div.id="title_div";
   title_div.className="title_div";
   poc_id.appendChild(title_div);
   let title_div_input  = document.querySelector('.title_div');
   let location = document.createElement("h2");
   location.className = 'poc_h2'
   location.innerText= "城市"
   title_div_input.appendChild(location);
   let Mean = document.createElement("h2");
   Mean.className = 'poc_h2'
   Mean.innerText= "平均值"
   title_div_input.appendChild(Mean);
   let Max = document.createElement("h2");
   Max.className = 'poc_h2'
   Max.innerText=  "最高值"
   title_div_input.appendChild(Max);
   let Min = document.createElement("h2");
   Min.className = 'poc_h2'
   Min.innerText= "最低值"
   title_div_input.appendChild(Min);
   let Sap = document.createElement("h2");
   Sap.className = 'poc_h2'
   Sap.innerText= "採樣數"
   title_div_input.appendChild(Sap);


   
    for(var i = 0 ; i<=8;i++){
        let data_div = document.createElement("div");
        data_div.className='data_div';
        data_div.id='data_div'+[i];
        poc_id.appendChild(data_div);
        let data_div_input  = document.getElementById('data_div'+[i]);
        let locationName_input = data['records']['weatherElement'][date]['location'][i]['locationName']
        let Mean_data_input= data['records']['weatherElement'][date]['location'][i]['parameter'][0]['parameterValue']
        let Max_data_input = data['records']['weatherElement'][date]['location'][i]['parameter'][1]['parameterValue']
        let Min_data_input = data['records']['weatherElement'][date]['location'][i]['parameter'][2]['parameterValue']
        let Sap_data_input = data['records']['weatherElement'][date]['location'][i]['parameter'][3]['parameterValue']

        if(Mean_data_input === ''){
            Mean_data_input = '0.0'
        }
        let location_data = document.createElement("h3");
        location_data.id = 'location_h3'
        location_data.className = 'poc_h3'
        location_data.innerText= locationName_input
        data_div_input.appendChild(location_data);
        let Mean_data = document.createElement("h3");
        Mean_data.className = 'poc_h3'
        Mean_data.innerText= Mean_data_input
        data_div_input.appendChild(Mean_data);
        let Max_data = document.createElement("h3");
        Max_data.className = 'poc_h3'
        Max_data.innerText= Max_data_input
        data_div_input.appendChild(Max_data);
        let Min_data = document.createElement("h3");
        Min_data.className = 'poc_h3'
        Min_data.innerText=Min_data_input
        data_div_input.appendChild(Min_data);
        let Sap_data = document.createElement("h3");
        Sap_data.className = 'poc_h3'
        Sap_data.innerText=Sap_data_input
        data_div_input.appendChild(Sap_data);
    }

})
