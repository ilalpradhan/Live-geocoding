
// const geocoder = L.mapbox.geocoder('mapbox.places');
// const marker = {
// 	icon: L.mapbox.marker.icon()};
var mymap;
var marker;
var init=async ()=>{
    await hideform();
    L.mapbox.accessToken = 'pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2tpMXkxN2s3MDU5ODJybzVsMzYxN3o2ciJ9.SPwmcyoXwNfWcuYxn8qiIg';
    mymap = L.map('mapid').setView([41.083, -74.176], 13);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2tpMXkxN2s3MDU5ODJybzVsMzYxN3o2ciJ9.SPwmcyoXwNfWcuYxn8qiIg' // add your mapbox token here
    }).addTo(mymap)
    marker = {
        icon: L.mapbox.marker.icon({
                  'marker-size': 'medium',
                  'marker-color': '#03ad82'
    })};
    const mark = (coordinates,i) => {
        L.marker(coordinates).addTo(mymap);
        let name=document.getElementsByClassName("contactFullName");
        console.log(JSON.stringify(name[i].textContent));
        //marker.bindTooltip(JSON.stringify(name[i].textContent)).openTooltip(); // tooltip
    }

    let elements=document.getElementsByClassName("contactlatlng");
    console.log(elements);
    
    for(i=0;i<elements.length;i++ ){
        let latlong=[];
        console.log(elements[i]);
       
        console.log(JSON.stringify(elements[i].textContent));
        splits=JSON.stringify(elements[i].textContent).split(",");
        latlong.push(parseFloat(splits[0].substring(1)));
        latlong.push(parseFloat(splits[1]));
        mark(latlong,i);
        
    }  
    
}


var moveToLocation = (coordinates) => {
    mymap.flyTo(coordinates, 8);
}
const GoToLocation=(obj)=>{
    let latlong=[];
    //console.log(obj.getElementsByClassName("contactlatlng"));
    let a=obj.getElementsByClassName("contactlatlng");
    splits=JSON.stringify(a[0].textContent).split(",");
    latlong.push(parseFloat(splits[0].substring(1)));
    latlong.push(parseFloat(splits[1]));
    moveToLocation(latlong);
}


const mask = (notAForm,Form) => {
    document.getElementById("NotaForm").style.display = Form ? "block" : "none";
    document.getElementById("form").style.display = notAForm ? "block" : "none";
}
displayform=()=>{
    mask(true,false);
}

const showform=(obj)=>{
mask(true,false);
var a=obj.parentNode.getElementsByClassName("contactfirstName");
document.getElementById("firstName").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactlastName");
document.getElementById("lastName").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactstreet");
document.getElementById("street").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactcity");
document.getElementById("city").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactstate");
document.getElementById("state").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactzip");
document.getElementById("zip").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactPhone");
document.getElementById("phone").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("contactEmail");
document.getElementById("email").value=a[0].textContent;

a=obj.parentNode.getElementsByClassName("databaseId");
//console.log(a[0].textContent);
document.getElementById("dBid").value=a[0].textContent;
}
const updateform=(obj)=>{
    var a=obj.parentNode.getElementsByClassName("databaseId");
    a=obj.parentNode.getElementsByClassName("firstName");
    var info={
        firstName:a[0].textContent,
        lastName:post["lastName"],
        street:post["street"],
        city:post["city"],
        state:post["state"],
        zip:post["zip"],
        phone:post["phone"],
        email: post["email"],
        prefix:post["prefix"],
        canMail:post["canMail"],
        canCall:post["canCall"],
        canEmail:post["canEmail"],
        latlng:post["latlng"]
      };
}
const hideform=()=>{
    mask(false,true);
}
const deleteid=async(obj)=>{
    var a=obj.parentNode.getElementsByClassName("databaseId");
    console.log(a[0].textContent);
    await axios.post("/contactdelete",{id:a[0].textContent });
    window.location.reload();
}

function myfirstnameFunction() {
    
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchByFirstName");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableid");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function secondNameFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchByLastName");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableid");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  function addressfunction(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchByAddress");
    var newNode=document.createElement("li");
    newNode.value=
    filter = input.value.toUpperCase();
    table = document.getElementById("tableid");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
    }

  }
  function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}