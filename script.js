const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

fetch("https://api.covid19api.com/dayone/country/india/status/confirmed")
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((stringResults) => {
    //1.remove data that are before 1st April
    const results = JSON.parse(stringResults);

    const afterAprilData = results.filter(function (result) {
      if (new Date(result.Date) >= new Date(2020, 3, 1)) {
        return true;
      } else {
        return false;
      }
    });

    console.log(afterAprilData);
    //2.format the data

    const formattedDates = afterAprilData.map(function (data) {
      const date = new Date(data.Date);
      const fomrmatedStringDate =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      return fomrmatedStringDate;
    });

    console.log(formattedDates);

    const cases = afterAprilData.map((data) => data.Cases);
    console.log(cases);

    //3.plot a graph
    const chart = new Chart(context, {
      type: "line",
      data: {
        labels: formattedDates,
        datasets: [
          {
            label: "India",
            borderColor: "#87ceeb",
            data: cases,
            fill: false,
          },
        ],
      },
    });
  })
  .catch((e) => {
    console.log(e);
    console.log("Error Occurred");
  });
