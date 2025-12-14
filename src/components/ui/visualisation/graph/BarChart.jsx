import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = forwardRef(({ data, highlightedIndex = 0, zoom = 0, loading = false, avg = false, graphColourScheme='schemeCategory10', displayGridBackground=true }, ref) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const visibilityRef = useRef({});
  // console.log(graphColourScheme);

  useImperativeHandle(ref, () => ({
    clearChart() {
      d3.selectAll('.bar-data').remove();
    },
    toggleVariableVisibility(variable, visible) {
      const displayValue = visible ? null : 'none';
      d3.selectAll(`.bar-${variable}`).style('display', displayValue);
      visibilityRef.current[variable] = visible;
    }
  }));

  useEffect(() => {
    function handleResize() {
      if (wrapperRef.current) {
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [zoom]);

  useEffect(() => {
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

    // Scale displacement * 100 (your original scaling)
    const processedData = data.map(record => ({
      ...record,
      displacement: record.displacement * 100,
      treeMeanGrowth: record.treeMeanGrowth * 100
    }));

    const margin = { top: 60, right: 100, bottom: 70, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom - 20;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const graph = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const legendLabels = {
        temperature: 'Temperature\n',
        humidity: 'Humidity\n',
        soilMoisture: 'Soil Moisture\n',
        displacement: `Displacement\n`,
        treeMeanGrowth: `Tree Mean\n Growth\n`
    };
    const legendUnits = {
        temperature: 'ºC',
        humidity: '%',
        soilMoisture: '%',
        displacement: 'µm (x100)',
        treeMeanGrowth: 'µm (x100)',
    };

    const variables = Object.keys(processedData[0]).filter(
      key => !['timestamp', 'count', 'binStart', 'binEnd'].includes(key)
    );

  function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  };

    // Use band scale on timestamps for even bar spacing — no gaps
    const timestamps = processedData.map(d => d.timestamp);

    const x0 = d3.scaleBand()
      .domain(timestamps)
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    // Band scale for variables within each timestamp group
    const x1 = d3.scaleBand()
      .domain(variables)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .nice()
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
    

    // Control number of ticks on x-axis
    const maxTicks = Math.min(10, timestamps.length);
    const tickStep = Math.ceil(timestamps.length / maxTicks);

    const tickValues = timestamps.filter((_, i) => i % tickStep === 0);

    const xAxis = d3.axisBottom(x0)
      .tickValues(tickValues)
      .tickFormat(d => {
        const date = new Date(d);
        return d3.timeFormat('%d/%m/%Y %H:%M')(date);
      });

    if (displayGridBackground) {
          // Grid Lines
          const yGrid = d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat(''); // no tick labels
    
          // Vertical grid lines (across the height of the graph)
          const xGrid = d3.axisBottom(x0)
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
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    graph.append('g').call(d3.axisLeft(y));

    const tooltip = tooltipRef.current;

    // Draw bars grouped by timestamp
    graph.selectAll('g.bar-group')
      .data(processedData)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', d => `translate(${x0(d.timestamp)},0)`)
      .selectAll('rect')
      .data(d => variables.map(key => ({ key, value: d[key], ...d })))
      .enter()
      .append('rect')
      .attr('class', d => `bar-data bar-${d.key}`)
      .attr('x', d => x1(d.key))
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => color(d.key))
      .style('display', d => visibilityRef.current[d.key] === false ? 'none' : null)
      .on('mouseover', (event, d) => {
        const reading = typeof d.value === 'number'
          ? d.key === 'temperature'
            ? `${d.value.toPrecision(4)}${legendUnits[d.key] || ''} | ${celsiusToFahrenheit(d.value).toPrecision(4)}°F`
            : `${d.value.toPrecision(4)}${legendUnits[d.key] || ''}`
          : 'N/A';
  

        tooltip
          .style('opacity', 1)
          .html(`
            <strong>${legendLabels[d.key]}</strong><br/>
            ${d.binStart ? `Start: ${new Date(d.binStart).toLocaleString()}<br/>` : ''}
            ${d.binEnd ? `End: ${new Date(d.binEnd).toLocaleString()}<br/>` : ''}
            ${d.count ? `Count: ${d.count}<br/>` : ''}
            Reading: ${reading}
          `);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

      const legendGroup = graph.append('g')
  .attr('transform', `translate(${width + 15}, 20)`);
  const keyText = legendGroup.append('text')
  .attr('x', 0)
  .attr('y', 0)
  .attr('fill', 'black')
  .style('font-weight', 'bold')
  .style('font-size', '14px')
  .text('Key');

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
    color: color(variable)
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

    // Axis labels
    graph.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Time');

    graph.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 15)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text(`Sensor Reading ${avg && '(Averaged)'}`);
  }, [data, highlightedIndex, dimensions, graphColourScheme, displayGridBackground]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', display: 'flex' }}>
      {data.length > 0
        ? <svg ref={svgRef} style={{ flex: 1 }}></svg>
        : <h4 className="w-100 d-flex flex-column justify-content-center">
          {loading ? 'Loading...' : 'No data to display'}
        </h4>}
    </div>
  );
});

export default BarChart;
