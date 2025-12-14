import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const SingleLineGraph = forwardRef(({ data, highlightedIndex=0, zoom=0, loading=false, graphColourScheme='schemeCategory10', displayGridBackground=true }, ref) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const visibilityRef = useRef({});
  // console.log(data);

useEffect(() => {
    function handleResize() {
      if (wrapperRef.current) {
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }

    handleResize(); // initial dimensions
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, [zoom]);

useImperativeHandle(ref, () => {
  // Define toggle function inside the hook scope
  function toggleVariableVisibility(variable, visible) {
    const displayValue = visible ? null : 'none'; // null to show, 'none' to hide
    d3.selectAll(`.line-${variable}`).style('display', displayValue);
    d3.selectAll(`.dot-${variable}`).style('display', displayValue);
    visibilityRef.current[variable] = visible;
  }

  // Return all methods you want exposed via the ref
  return {
    clearChart() {
      d3.selectAll('.line-data').remove();
      d3.select(svgRef.current).selectAll('circle').remove();
    },
    toggleVariableVisibility
  };
});


  useEffect(() => {
    function handleResize() {
      if (wrapperRef.current) {
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }

    handleResize(); // initial dimensions
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

useEffect(() => {
  // Only run once
  if (!tooltipRef.current) {
    tooltipRef.current = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '8px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('font-size', '12px');
  }
}, []);


  useEffect(() => {
    if (!data || data.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;
    data = data.map(record => ({
        ...record,
        displacement: record.displacement * 100,
        ...(record.treeMeanGrowth !== undefined && { treeMeanGrowth: record.treeMeanGrowth * 100 }),
        ...(record.vpd !== undefined && { vpd: record.vpd * 10 })
    }));


    // Setup
    const margin = { top: 60, right: 150, bottom: 40, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom - 50;


    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
  .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

// Append a group for the chart area
const graph = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);


    const legendLabels = {
        temperature: 'Temperature\n',
        humidity: 'Humidity\n',
        soilMoisture: 'Soil Moisture\n',
        displacement: 'Displacement\n',
        vpd: 'VPD\n',
        treeMeanGrowth: 'Tree Mean Growth\n'
    };
    const legendUnits = {
        temperature: 'ºC',
        humidity: '%',
        soilMoisture: '%',
        displacement: 'µm (x100)',
        vpd: 'kPa (x10)',
        treeMeanGrowth: 'µm (x100)'
    };
    
    // const variables = Object.keys(data[0]).filter(key => key !== ('timestamp' || 'count' || 'binStart' || 'binEnd'));
    const variables = Object.keys(data[0]).filter(key => !['timestamp', 'count', 'binStart', 'binEnd'].includes(key));


    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

     const schemes = {
      schemeCategory10: d3.schemeCategory10,
      schemeAccent: d3.schemeAccent,
      schemeDark2: d3.schemeDark2,
      schemePaired: d3.schemePaired,
      schemePastel1: d3.schemePastel1,
      schemePastel2: d3.schemePastel2,
      schemeSet1: d3.schemeSet1,
      schemeSet2: d3.schemeSet2,
      schemeSet3: d3.schemeSet3,
      schemeTableau10: d3.schemeTableau10
    };
    
    const color = d3.scaleOrdinal(schemes[graphColourScheme] || d3.schemeCategory10);

    // Axes
    const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickFormat(d3.timeFormat('%d/%m/%Y %H:%M')); // Customize date/time format

    if (displayGridBackground) {
      // Grid Lines
      const yGrid = d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat(''); // no tick labels

      // Vertical grid lines (across the height of the graph)
      const xGrid = d3.axisBottom(xScale)
        .tickSize(-height)
        .tickFormat('');

        // Y Grid (horizontal lines)
      graph.append('g')
        .attr('class', 'y-grid')
        .call(yGrid)
        .selectAll('line')
        .style('stroke', '#ccc')
        .style('stroke-opacity', 0.3)
      graph.select('.y-grid').select('.domain').style('display', 'none');

      // X Grid (vertical lines)
      graph.append('g')
        .attr('class', 'x-grid')
        .call(xGrid)
        .selectAll('line')
        .style('stroke', '#ccc')
        .style('stroke-opacity', 0.3)
      graph.select('.x-grid').select('.domain').style('display', 'none');
    }


    graph.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis)
    .selectAll('text') // Select all tick text elements
    .style('text-anchor', 'end')
    .attr('dx', '-0.8em')
    .attr('dy', '0.15em')
    .attr('transform', 'rotate(-45)');


    graph.append('g').call(d3.axisLeft(yScale));

    // Line generator
    const line = d3.line()
      .x(d => xScale(d.timestamp))
      .y(d => yScale(d.value));

    variables.forEach((variable, i) => {
      const lineData = data.map(d => ({
        ...d,
        timestamp: d.timestamp,
        value: d[variable]
      }));

      graph.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', color(i))
        .attr('stroke-width', 2)
        .attr('d', line)
        .attr('class', `line-data line-${variable}`)
        .style('display', visibilityRef.current[variable] === false ? 'none' : null);
            
const legendGroup = graph.append('g')
  .attr('transform', `translate(${width + 35}, 20)`);
  const keyText = legendGroup.append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('fill', 'black')
  .style('font-weight', 'bold')
  .style('font-size', '14px')
  .text('Key');

// variables.forEach((variable, i) => {
// //   const legendText = `${legendLabels[variable]} (${legendUnits[variable]})` || variable;
// //   const legendTextLines = legendText.split('\n');
// const allVariables = Object.keys(legendLabels);

// const legendTextLines = allVariables
//   .filter(variable =>
//     data.some(record => record.hasOwnProperty(variable)) &&
//     legendLabels[variable] &&
//     legendUnits[variable]
//   )
//   .map(variable => `${legendLabels[variable]} (${legendUnits[variable]})`);

// const legendText = legendTextLines.join('\n');



//   const textElem = legendGroup.append('text')
//     .attr('fill', color(i))
//     .attr('y', 20 + i * 30)
//     .style('font-size', '12px');

//   legendTextLines.forEach((line, index) => {
//     textElem.append('tspan')
//       .attr('x', 0)
//       .attr('dy', index === 0 ? 0 : '1.2em')
//       .text(line);
//   });
// });
// const legendTextLines = variables
//   .filter(variable =>
//     data.some(record => record.hasOwnProperty(variable)) &&
//     legendLabels[variable] &&
//     legendUnits[variable]
//   )
//   .map(variable => ({
//     text: `${legendLabels[variable]} (${legendUnits[variable]})`,
//     color: color(variables.indexOf(variable))
//   }));
const legendTextLines = variables
  .filter(variable =>
    data.some(record => record.hasOwnProperty(variable)) &&
    legendLabels[variable] &&
    legendUnits[variable]
  )
  .map(variable => ({
    lines: [
      legendLabels[variable],
      `(${legendUnits[variable]})`
    ],
    color: color(variables.indexOf(variable))
  }));
  legendTextLines.forEach((legend, i) => {
  const textElem = legendGroup.append('text')
    .attr('fill', legend.color)
    .attr('y', 30 + i * 30) // adjust spacing
    .style('font-size', '12px');

  legend.lines.forEach((line, j) => {
    textElem.append('tspan')
      .attr('x', 0)
      .attr('dy', j === 0 ? 0 : '1.2em')
      .text(line);
  });
});

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
};


// legendTextLines.forEach((lineObj, index) => {
//   legendGroup.append('text')
//     .attr('x', 0)
//     .attr('y', 20 + index * 20)
//     .attr('fill', lineObj.color)
//     .style('font-size', '12px')
//     .text(lineObj.text);
// });


const bbox = legendGroup.node().getBBox();

const padding = 6;
keyText
  .attr('x', bbox.width / 2)
  .attr('text-anchor', 'middle');

legendGroup.insert('rect', ':first-child')
  .attr('x', bbox.x - padding)
  .attr('y', bbox.y - padding)
  .attr('width', bbox.width + padding * 2)
  .attr('height', bbox.height + padding * 2)
  .attr('fill', 'whitesmoke')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('rx', 1)
  .attr('ry', 2);

    
        // X Axis Label
        graph.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text('Time');

        // Y Axis Label
        graph.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text('Sensor Reading');

        const tooltip = tooltipRef.current;

    // Draw points for tooltip
    graph.selectAll(`.dot-${variable}`)
        .data(lineData)
        .enter()
        .append('circle')
        .attr('class', `dot-${variable}`)
        .style('display', visibilityRef.current[variable] === false ? 'none' : null)
        .attr('cx', d => xScale(d.timestamp))
        .attr('cy', d => yScale(d.value))
        .attr('r', 4)
        .attr('fill', (d, idx) => {
            if (idx === highlightedIndex) return 'black';
            return d3.color(color(i)).brighter(0.5);
        })
        .attr('opacity', (d, idx) => {
            if (idx === highlightedIndex) return 1;
            return 0.5;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .on('mouseover', function (event, d) {
              const reading = typeof d.value === 'number'
                ? variable === 'temperature'
                  ? `${d.value.toPrecision(4)}${legendUnits[variable] || ''} | ${celsiusToFahrenheit(d.value).toPrecision(4)}°F`
                  : `${d.value.toPrecision(4)}${legendUnits[variable] || ''}`
                : 'N/A';
            
            tooltip
                .style('opacity', 1)
                .html(`
                <strong>${legendLabels[variable]}</strong><br/>
                ${d.binEnd ? 'Start ' :''}Time: ${d.timestamp.toLocaleString()}<br/>
                ${d.binEnd ? 'End Time: ' :''}${d.binEnd ? `${d.binEnd?.toLocaleString()}<br/>` : ''}
                ${d.count ? 'Averaged Values: ' :''}${d.count ? `${d.count}<br/>` : ''}
                Reading: ${reading}
                `);
            // const reading = typeof d.value === 'number'
            //     ? `${d.value.toFixed(2)}${legendUnits[variable] || ''}`
            //     : 'N/A';
            // tooltip
            //     .style('opacity', 1)
            //     .html(`
            //         <strong>${legendLabels[variable]}</strong><br/>
            //         ${d.binEnd ? 'Start ' :''}Time: ${d.timestamp.toLocaleString()}<br/>
            //         ${d.binStart ? `Start Time: ${new Date(d.binStart).toLocaleString()}<br/>` : ''}
            //         ${d.binEnd ? `End Time: ${new Date(d.binEnd).toLocaleString()}<br/>` : ''}
            //         ${d.count ? `Averaged Values: ${d.count}<br/>` : ''}
            //         Reading: ${reading}
            //     `);
            })
            .on('mousemove', function (event) {
            tooltip
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function () {
            tooltip.style('opacity', 0);
            });
        


        });
    }, [data, highlightedIndex, dimensions, graphColourScheme, displayGridBackground]);

  return (
  <div
    ref={wrapperRef}
    style={{
      width: '100%',
      height: '100%',
      display: 'flex'
    }}
  >
    { (data.length > 0) ? <svg ref={svgRef} style={{ flex: 1 }}></svg> : <h4 className='w-100 d-flex flex-column justify-content-center'>{loading ? 'Loading...' : 'No data to display'}</h4> }
  </div>
);


});

export default SingleLineGraph;
