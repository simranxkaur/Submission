
drawBarChart = () => {
    var data = this.props.data2;
    var temp_data = d3.flatRollup(
        data,
        (d) => d.length,
        (d) => d.day
    );

    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var svg = d3
        .select(".barChart")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom);

    var y_data = temp_data.map((item) => item[0]);
    var y_scale = d3
        .scaleBand()
        .domain(y_data)
        .range([margin.top, h])
        .padding(0.2);

    var x_data = temp_data.map((selectedVariable) => selectedVariable[1]);
    var x_scale = d3
        .scaleLinear()
        .domain([0, d3.max(x_data)])
        .range([margin.left, w]);

    svg
        .selectAll("rect")
        .data(temp_data)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            return y_scale(d[0]);
        })
        .attr("x", margin.left) // Rectangles now start from the left edge
        .attr("height", y_scale.bandwidth())
        .attr("width", function (d) {
            return x_scale(d[1]) - margin.left; // Adjust width based on scale
        });

    svg.append('g')
        .attr('transform', `translate(0,${h})`) // Move x-axis to the bottom
        .call(d3.axisBottom(x_scale));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`) // Move y-axis to the left
        .call(d3.axisLeft(y_scale));

    svg.append("text")
        .text("Day")
        .attr("x", 250)
        .attr("y", 290);

    svg.append("text")
        .text("Tips")
        .attr("x", -5)
        .attr("y", 150);
}

