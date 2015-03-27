Measurement = (function () {

    function render(measurements, iterations) {
        var margin = {top: 40, right: 150, bottom: 0, left: 150},
            width = 600,
            height = 900;

        var start_year = 203,
            end_year = start_year + iterations;

        var c = d3.scale.category20c();

        var x = d3.scale.linear()
            .range([0, width]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top");

        var formatYears = d3.format("0000");
        xAxis.tickFormat(formatYears);

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("margin-left", margin.left + "px")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain([start_year, end_year]);
        var xScale = d3.scale.linear()
            .domain([start_year, end_year])
            .range([0, width]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + 0 + ")")
            .call(xAxis);

        for (var j = 0; j < measurements.length; j++) {
            var g = svg.append("g").attr("class", "journal");

            var circles = g.selectAll("circle")
                .data(measurements[j]['articles'])
                .enter()
                .append("circle");

            var text = g.selectAll("text")
                .data(measurements[j]['articles'])
                .enter()
                .append("text");

            var rScale = d3.scale.linear()
                .domain([0, d3.max(measurements[j]['articles'], function (d) {
                    return d[1];
                })])
                .range([2, 9]);

            circles
                .attr("cx", function (d, i) {
                    return xScale(d[0]);
                })
                .attr("cy", j * 20 + 20)
                .attr("r", function (d) {
                    return rScale(d[1]);
                })
                .style("fill", function (d) {
                    return c(j);
                });

            text
                .attr("y", j * 20 + 25)
                .attr("x", function (d, i) {
                    return xScale(d[0]) - 5;
                })
                .attr("class", "value")
                .text(function (d) {
                    return d[1];
                })
                .style("fill", function (d) {
                    return c(j);
                })
                .style("display", "none");

            g.append("text")
                .attr("y", j * 20 + 25)
                .attr("x", width + 20)
                .attr("class", "label")
                .text(truncate(measurements[j]['name'], 30, "..."))
                .style("fill", function (d) {
                    return c(j);
                })
                .on("mouseover", mouseOver)
                .on("mouseout", mouseOut);
        }

        function mouseOver(p) {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display", "none");
            d3.select(g).selectAll("text.value").style("display", "block");
        }

        function mouseOut(p) {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display", "block");
            d3.select(g).selectAll("text.value").style("display", "none");
        }

        function truncate(str, maxLength, suffix) {
            if (str.length > maxLength) {
                str = str.substring(0, maxLength + 1);
                str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
                str = str + suffix;
            }
            return str;
        }

    }

    return {
        render: render
    };

})();