let menu = document.querySelector(".menu")
let menuBtn = document.querySelector(".header-icon")
let menuBtnIcon = document.querySelector(".header-icon i")

menuBtn.addEventListener("click" , function(){
    if(menuBtnIcon.classList.contains("fa-bars")){
        menu.style.left = "0"
        menuBtnIcon.classList ="fa fa-times"
    }else{
         menu.style.left = "-256";
         menuBtnIcon.classList = "fa fa-bars";

    }
})



const countryApi = "https://gate.visapick.com/location/api/v1/country/";
const countrySelect = document.getElementById("country");
window.onload = async () => {
  const response = await fetch(countryApi);
  const countries = await response.json();
  options = countries.data.map((country) => {
    return `<option value="${country.name}">${country.name}</option>`;
  });
  console.log(options);
  countrySelect.innerHTML = options;
};

let myForm = document.getElementById("myForm");
countrySelect.addEventListener("change", function (e) {
  e.preventDefault();
  let country = document.getElementById("country").value;
  console.log(country);

  let url = "https://disease.sh/v3/covid-19/countries/" + country;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let length = res.length;
      let index = length - 1;
      let cases = document.getElementById("cases");
      let recovered = document.getElementById("recovered");
      let deaths = document.getElementById("deaths");
      console.log(res);

      let tbody = document.getElementById("table-body");
      let html = "<tr>";

      html += `<td> ${cases} </td>`;
      html += `<td> ${recovered} </td>`;
      html += `<td> ${deaths} </td>`;

      tbody.innerHTML = html;
    });
});




function chartDrawer(deaths, recovered) {
  let ctx = document.getElementById("myChart");

  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Death", "Recovered"],
      datasets: [
        {
          label: "# of Votes",
          data: [deaths, recovered],
          backgroundColor: ["rgba(220, 53, 69)", "rgba(0, 183, 74)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      animation: false,
    },
  });
}

var options = {
  series: [
    {
      deaths: "High - 2013",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      recovered: "Low - 2013",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#77B6EA", "#545454"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Average High & Low Temperature",
    align: "left",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    title: {
      text: "Month",
    },
  },
  yaxis: {
    title: {
      text: "Temperature",
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

function init() {
  let url = `https://disease.sh/v3/covid-19/countries/` + country;

  loader.style.visibility = "visible";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let infoAllCountries = data.total;

      loader.style.visibility = "hidden";

      tableBodyCreate(
        "all",
        infoAllCountries.today_cases,
        infoAllCountries.today_recovered,
        infoAllCountries.today_deaths
      );
      if (myChart) {
        myChart.destroy();
      }
      chartDrawer(
        infoAllCountries.today_deaths,
        infoAllCountries.today_recovered
      );
    });
}





let url = `https://saurav.tech/NewsAPI/top-headlines/category/health/us.json`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let neswHtml = document.getElementById("news");
    let html = "";

    for (let i = 0; i < 3; i++) {
      html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
      html += '<div class="card">';
      if (data.articles[i].urlToImage) {
        html += `<img src="${data.articles[i].urlToImage}" class="card-img-top" alt="Some Issues Happen!">`;
      } else {
        html += `<img src="static/img/news2.jpg" class="card-img-top" alt="Some Issues Happen!">`;
      }
      html += '<div class="card-body">';
      html += `<h5 class = "card-title">${data.articles[i].title}</h5>`;
      html += `<p class="card-text">${data.articles[i].description}</p>`;
      html += `<a href="${data.articles[i].url}" class="btn btn-primary">Read More</a>`;
      html += "</div></div></div>";
    }
    neswHtml.innerHTML = html;
  });
