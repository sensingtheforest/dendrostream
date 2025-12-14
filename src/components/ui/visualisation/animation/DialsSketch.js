export default function dialsSketch(p, canvasParent) {
  let data = [];
  let scaleFactor = 1;
  let margin = 80;

  const baseRadius = 70;

  // Start with all variables visible
  let variables = [
    { key: 'displacement', color: 'red', label: 'Displacement', minValue: 0, maxValue: 10, visible: true },
    { key: 'soilMoisture', color: 'green', label: 'Soil Moisture', minValue: 0,  maxValue: 100, visible: true },
    { key: 'temperature', color: 'blue', label: 'Temperature', minValue: -20,  maxValue: 60, visible: true },
    { key: 'humidity', color: 'orange', label: 'Humidity',  minValue: 0, maxValue: 100, visible: true },
    { key: 'vpd', color: 'purple', label: 'VPD',  minValue: 0, maxValue: 10, visible: true },
    { key: 'treeMeanGrowth', color: 'brown', label: 'Tree Mean Growth',  minValue: 0.2, maxValue: 0.4, visible: true },
  ];

  const units = {
    temperature: 'ºC | ºF',
    humidity: '%',
    soilMoisture: '%',
    displacement: 'µm',
    vpd: 'kPa',
    treeMeanGrowth: 'µm'
  };

  p.updateData = newData => {
    data = newData;
    p.redraw();
  };

  p.updateVariables = newVariables => {
    // Replace variables array with new one (expected to have visible flags)
    variables = newVariables;
    if (p._renderer) {
  p.setSize(p.width);
}

  };

  p.setSize = (containerWidth) => {
    const columns = 2;

    // Only count visible variables
    const visibleVarsCount = variables.filter(v => v.visible).length;
    const rows = Math.ceil(visibleVarsCount / columns);

    const maxCanvasWidth = Math.min(containerWidth, 2000);
    const availableWidthPerDial = maxCanvasWidth / columns;
    const targetRadius = (availableWidthPerDial - margin) / 2;
    const clampedRadius = p.constrain(targetRadius, 30, 100);

    scaleFactor = clampedRadius / baseRadius;

    const dialSize = clampedRadius * 2 + margin;
    const width = columns * dialSize + margin + 10;
    const height = rows * dialSize + margin;

    p.resizeCanvas(width, height);
    p.redraw();
  };


  p.setup = () => {
    // Initial canvas size with all variables visible
    const visibleVarsCount = variables.filter(v => v.visible).length;
    const columns = 2;
    const rows = Math.ceil(visibleVarsCount / columns);

    const totalWidth = columns * (baseRadius * 2 + margin) + margin + 6;
    const totalHeight = rows * (baseRadius * 2 + margin) + margin;
    const canvas = p.createCanvas(totalWidth, totalHeight);
    canvas.parent(canvasParent);
    p.noLoop();
  };

  p.draw = () => {
    p.clear();
    p.background('#e6f2f3');
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width, p.height);

    const latest = data.length > 0 ? data[data.length - 1] : {};
    const r = baseRadius * scaleFactor;

    const columns = 2;


    const timestamp = latest?.timestamp ? new Date(latest.timestamp).toLocaleString() : 'No Data Available';
    const binEnd = latest?.binEnd ? new Date(latest.binEnd).toLocaleString() : null;
    const count = latest?.count ?? null;

    // Center the rectangle by switching rectMode temporarily
p.push();
p.rectMode(p.CENTER);
p.fill(255, 255, 255, 200); // white with transparency

// Calculate box height dynamically based on number of lines
const lines = 1 + (binEnd ? 1 : 0) + (count ? 1 : 0);
const lineHeight = 18 * scaleFactor;
const boxHeight = lines * lineHeight + 10; // 20 px padding vertically
const boxWidth = 375; // adjust as needed

p.noStroke();
p.rect(p.width / 2, 10 + boxHeight / 2, boxWidth, boxHeight, 2);
p.pop();

// Text styles
p.noStroke();
p.fill(50);
p.textAlign(p.CENTER, p.TOP);
p.textSize(18 * scaleFactor);
p.textStyle(p.BOLD);

let textY = 15; // start a little below top edge of rect

p.text(`${binEnd ? 'Start ' : ''} Time: ${timestamp}`, p.width / 2, textY);
textY += lineHeight;

if (binEnd) {
  p.text(`End Time: ${binEnd}`, p.width / 2, textY);
  textY += lineHeight;
}

if (count) {
  p.text(`Averaged Values: ${count}`, p.width / 2, textY);
}



    // Filter visible variables only
    const visibleVars = variables.filter(v => v.visible);

    visibleVars.forEach((v, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);

      const x = margin + r + col * (r * 2 + margin);
      const y = margin + r + row * (r * 2 + margin);

    //   const val = p.constrain(latest[v.key] || 0, 0, v.maxValue);
    if (!v || typeof v.key === 'undefined') return;

const rawValue = latest?.[v.key];
const valueToUse = typeof rawValue === 'number' ? rawValue : 0;
// const val = p.constrain(valueToUse, 0, v.maxValue);
const val = p.constrain(valueToUse, v.minValue, v.maxValue);
      drawDial(x, y, r, val, v, rawValue);
    });
  };

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
};

function drawDial(x, y, r, val, v, rawValue=0) {
  const startAngle = p.radians(270); // 270 degrees
  const endAngle = startAngle + p.TWO_PI; // 270 + 360 degrees (full circle)

  const angleScale = p.map(val, v.minValue, v.maxValue, startAngle, endAngle);
  const unit = units[v.key] || ''; // fallback if key not found

  p.push();
  p.translate(x, y);

  // Inner background
  p.stroke('lightgray');
  p.strokeWeight(1);
  p.fill('whitesmoke');
  p.ellipse(0, 0, (r * 2) - (15 * scaleFactor), (r * 2) - (15 * scaleFactor));

  // Gray background arc (full dial range)
  p.stroke('lightgray');
  p.strokeWeight(15 * scaleFactor);
  p.noFill();
  p.arc(0, 0, r * 2, r * 2, startAngle, endAngle);

  // Value arc border (drawn first, slightly wider)
  p.stroke('lightgray');
  p.strokeWeight((15 + 2) * scaleFactor);
  p.noFill();
  p.arc(0, 0, r * 2, r * 2, startAngle, angleScale);

  // Actual value arc (on top)
  p.stroke(v.color);
  p.strokeWeight(15 * scaleFactor);
  p.noFill();
  p.arc(0, 0, r * 2, r * 2, startAngle, angleScale);

  // Outer border
  p.stroke('gray');
  p.strokeWeight(1);
  p.noFill();
  p.ellipse(0, 0, r * 2 + (15 * scaleFactor), r * 2 + (15 * scaleFactor));

  // Text value
  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(18 * scaleFactor);
  p.text(`${rawValue?.toFixed(2)}${(v?.key === 'temperature') ? ` | ${celsiusToFahrenheit(rawValue || 0).toFixed(2)}` : ''}`, 0, 0);

  // Unit
  p.textStyle(p.NORMAL);
  p.textSize(10 * scaleFactor);
  p.text(unit, 0, 45 * scaleFactor);

  // Label
  p.textSize(12 * scaleFactor);
  p.textStyle(p.BOLD);
  p.text(v.label, 0, 30 * scaleFactor);

  p.pop();
}

}
