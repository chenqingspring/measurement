document.addEventListener('DOMContentLoaded', function () {
    var URL = "1zmjDANgPTlfbEygjCmESdkW1nsQCp257gkipq64sm3U";
    Tabletop.init({key: URL, callback: retrieveData, simpleSheet: true})
});

function retrieveData(data) {
    var measurements = [],
        iterations = data.length,
        factor = ["Cards",
            "Showcase Failure",
            "CI Failure ENV",
            "CI Failure",
            "QA to Dev",
            "CA to Dev",
            "CI Blocks Push",
            "Online Bug",
            "Blocked Cards",
            "Diff",
            "Session",
            "Max Lead Time"];

    factor.forEach(function (key) {
        var measurement, articles = [], name, number;

        data.forEach(function (item) {
            number = item[key] && item[key] != "N/A" ? item[key] : 0;
            articles.push([parseInt(item["Sprint No."]), parseInt(number)]);
        });
        name = key;
        measurement = {
            "articles": articles,
            "name": name
        };
        measurements.push(measurement);
    });

    FIGURE.render(measurements, iterations);
}

