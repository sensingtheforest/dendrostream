export default function ForestSceneSketch(p, canvasParent) {

  let data = [];
  let scaleFactor = 1;
  const forestTrees = [
  { x: 20, y: 350, scale: 0.3 * scaleFactor },
  { x: 60, y: 340, scale: 0.4 * scaleFactor },
  { x: 100, y: 360, scale: 0.35 * scaleFactor },
  { x: 140, y: 345, scale: 0.45 * scaleFactor },
  { x: 180, y: 355, scale: 0.25 * scaleFactor },
  { x: 220, y: 350, scale: 0.4 * scaleFactor },
  { x: 260, y: 365, scale: 0.3 * scaleFactor },
  { x: 300, y: 340, scale: 0.5 * scaleFactor },
  { x: 340, y: 355, scale: 0.35 * scaleFactor },
  { x: 380, y: 360, scale: 0.4 * scaleFactor },
  { x: 420, y: 355, scale: 0.3 * scaleFactor },
  { x: 460, y: 350, scale: 0.45 * scaleFactor },
  { x: 500, y: 355, scale: 0.4 * scaleFactor },
  { x: 550, y: 350, scale: 0.4 * scaleFactor },
  { x: 585, y: 355, scale: 0.3 * scaleFactor }
];

  // Start with all variables visible
  let variables = [
    { key: 'displacement', label: 'Displacement' },
    { key: 'soilMoisture', label: 'Soil Moisture' },
    { key: 'temperature', label: 'Temperature' },
    { key: 'humidity', label: 'Humidity' },
    { key: 'vpd', label: 'VPD' },
    { key: 'treeMeanGrowth', label: 'Tree Mean Growth' }
  ];

  const units = {
    temperature: 'ºC',
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
  }

const ASPECT_RATIO = 4 / 3.5;

p.setSize = (containerWidth) => {
  const width = containerWidth;
  const height = Math.min(width / ASPECT_RATIO, 750);
  p.resizeCanvas(width, height);
  p.redraw();
};

p.setup = () => {
  const initialWidth = Math.min(canvasParent.offsetWidth, 1000);
  const initialHeight = initialWidth / ASPECT_RATIO;
  const canvas = p.createCanvas(initialWidth, initialHeight);
  canvas.parent(canvasParent);
  p.noLoop();
};

  p.draw = () => {
    p.clear();
    const latest = data.length > 0 ? data[data.length - 1] : {
      displacement: 20,  // 0 to 100
      soilMoisture: 50,  // 0 to 100
      temperature: 22,   // -20 to 60
      humidity: 50
    };
    drawSky(latest.temperature);
    drawClouds(latest.humidity);
    drawSun(latest.temperature);
    drawSoil(latest.soilMoisture);
    drawForestBackground();
    if (latest.vpd) drawVPDIndicator(latest?.vpd);
    drawTree(latest.displacement);
    
    drawInfoBox(p, latest, scaleFactor);
    drawBottomRightVariableInfo(variables, latest);
  };

  function drawSky(temperature) {
    const coolBlue = p.color(100, 150, 255);
    const warmRed = p.color(255, 100, 100);
    const skyColor = p.lerpColor(coolBlue, warmRed, p.map(temperature, -10, 45, 0, 1));
    p.background(skyColor);
  }
  function drawSun(temperature) {

  const sunBright = p.lerpColor(p.color(255, 255, 200), p.color(255, 255, 0), p.map(temperature, -10, 45, 0, 1));
  
  const sunX = p.width - 100;
  const sunY = 100;
  // const sunRadius = 40;
  const sunRadius = p.map(temperature, -10, 45, 20, 80);


  // --- Sun rays ---
  p.push();
  p.stroke('goldenrod');
  p.strokeWeight(2);

  const rayCount = 12;
  const rayLength = 25;

  for (let i = 0; i < rayCount; i++) {
    const angle = p.TWO_PI * (i / rayCount);
    const x1 = sunX + p.cos(angle) * (sunRadius + 5);   // just outside sun
    const y1 = sunY + p.sin(angle) * (sunRadius + 5);
    const x2 = sunX + p.cos(angle) * (sunRadius + rayLength);
    const y2 = sunY + p.sin(angle) * (sunRadius + rayLength);
    p.line(x1, y1, x2, y2);
  }
  p.pop();

  // --- Sun body ---
  p.fill(sunBright);
  p.stroke('goldenrod');
  p.strokeWeight(1);
  p.ellipse(sunX, sunY, sunRadius * 2, sunRadius * 2);
}

function drawForestBackground() {
  for (const tree of forestTrees) {
    drawSimpleTree(tree.x, tree.y, tree.scale);
  }
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
};

function drawSimpleTree(x, y, s) {
  p.push();
  p.translate(x, y);
  p.scale(s);
  // Draw trunk with outline
  p.stroke('saddlebrown');
  p.strokeWeight(1);
  p.fill(120, 60, 20);
  p.rect(-15, 0, 30, 80);

  // Draw leaves with outline
  p.fill(30, 180, 60);
  p.stroke(0, 100, 0);
  p.strokeWeight(2);
  p.ellipse(0, -30, 100, 100);
  p.ellipse(-30, 0, 80, 80);
  p.ellipse(30, 0, 80, 80);

  p.pop();
}

  function drawTree(disp) {
    const size = p.map(disp, 0, 100, 1, 2.5);
    p.push();
    p.translate(p.width / 2, p.height - 150);
    p.scale(size);
    p.stroke('saddlebrown');
    p.strokeWeight(1);
    p.fill(120, 60, 20);
    p.rect(-15, 0, 30, 80);
    p.fill(30, 180, 60);
    p.stroke(0, 100, 0);
    p.strokeWeight(2);
    p.ellipse(0, -30, 100, 100);
    p.ellipse(-30, 0, 80, 80);
    p.ellipse(30, 0, 80, 80);
    p.pop();
  }

function drawSoil(moisture) {
  const soilHeight = 150;
  const soilY = p.height - soilHeight;

  const dryColor = p.color(210, 180, 140);
  const wetColor = p.color(80, 50, 20);
  const soilColor = p.lerpColor(dryColor, wetColor, p.map(moisture, 0, 100, 0, 1));

  // Base soil layer
  p.noStroke();
  p.fill(soilColor);
  p.rect(0, soilY, p.width, soilHeight);

  // Texture: darker soil flecks (organic matter / clumps)
  const grainCount = 150;
  for (let i = 0; i < grainCount; i++) {
    const x = p.random(p.width);
    const y = p.random(soilY, p.height);
    const size = p.random(1, 3);
    const shade = p.lerpColor(wetColor, p.color(40, 25, 10), p.random());
    p.fill(shade);
    p.ellipse(x, y, size, size * p.random(0.7, 1.2));
  }

  // Cracks if dry
if (moisture < 30) {
  p.stroke(50, 30, 0);
  p.strokeWeight(1);

  for (let i = 0; i < p.width; i += 22) {
    let x = i;
    let y = p.random(soilY + 5, p.height - 40); // starting point of crack
    const steps = p.int(p.random(5, 10));       // number of segments
    const segmentLength = p.random(2, 5);

    for (let j = 0; j < steps; j++) {
      const x2 = x + p.random(-5, 5);           // small horizontal shift
      const y2 = y + segmentLength;
      p.line(x, y, x2, y2);
      x = x2;
      y = y2;
      if (y > p.height) break; // stop if we go off canvas
    }
  }
}
}

  function drawClouds(humid) {
  const cloudCount = p.int(p.map(humid, 0, 100, 2, 10));
  const cloudSize = p.map(humid, 0, 100, 30, 80);

  p.fill(255, 255, 255, 230);
  p.stroke('lightgray');
  p.strokeWeight(1);

  for (let i = 0; i < cloudCount; i++) {
    let x = i * (p.width / cloudCount) + p.random(-20, 20);
    let y = p.random(50, 150);
    p.ellipse(x, y, cloudSize, cloudSize * 0.6);
    p.ellipse(x + 20, y + 10, cloudSize * 0.8, cloudSize * 0.5);
    p.ellipse(x - 20, y + 10, cloudSize * 0.8, cloudSize * 0.5);
  }
}

function drawVPDIndicator(vpdValue) {
  const acceptableMin = 0.8;
  const acceptableMax = 2.2;
  const inRange = vpdValue >= acceptableMin && vpdValue <= acceptableMax;
  const faceColor = inRange ? 'green' : 'red';
  const faceSize = 60;
  const margin = 20;
  const x = margin + faceSize / 2;
  const y = p.height - margin - faceSize / 2;

  // Draw face with black outline
  p.stroke(0);
  p.strokeWeight(2);
  p.fill(faceColor);
  p.ellipse(x, y, faceSize, faceSize);

  // Draw eyes
  p.noStroke();
  p.fill(0);
  p.ellipse(x - 10, y - 10, 5, 5);
  p.ellipse(x + 10, y - 10, 5, 5);

  // Draw mouth (smile or frown)
  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);
  if (inRange) {
    // smile
    p.arc(x, y + 5, 20, 10, 0, p.PI);
  } else {
    // sad face
    p.arc(x, y + 15, 20, 10, p.PI, 0);
  }
}




  function drawInfoBox(p, latest, scaleFactor) {
  const timestamp = latest?.timestamp ? new Date(latest.timestamp).toLocaleString() : 'No Data Available';
  const binEnd = latest?.binEnd ? new Date(latest.binEnd).toLocaleString() : null;
  const count = latest?.count ?? null;

  const lines = 1 + (binEnd ? 1 : 0) + (count ? 1 : 0);
  const lineHeight = 18 * scaleFactor;
  const boxHeight = lines * lineHeight + 10;
  const boxWidth = 300;

  p.push();
  p.rectMode(p.CENTER);
  p.fill(255, 255, 255, 200);
  p.noStroke();
  p.rect(p.width / 2, 10 + boxHeight / 2, boxWidth, boxHeight, 2);
  p.pop();

  // Text
  p.noStroke();
  p.fill(50);
  p.textAlign(p.CENTER, p.TOP);
  p.textSize(18 * scaleFactor);
  p.textStyle(p.BOLD);

  let textY = 15;
  p.text(`${binEnd ? 'Start ' : ''} Time: ${timestamp}`, p.width / 2, textY);
  textY += lineHeight;

  if (binEnd) {
    p.text(`End Time: ${binEnd}`, p.width / 2, textY);
    textY += lineHeight;
  }

  if (count) {
    p.text(`Averaged Values: ${count}`, p.width / 2, textY);
  }
}

function drawBottomRightVariableInfo(variables, latest) {
  const padding = 2;
  const lineHeight = 20;
  const boxWidth = 230;
  const boxHeight = variables.length * lineHeight + padding * 2;

  // Draw background box
  p.push();
  p.rectMode(p.CORNER);
  p.fill(255, 255, 255, 220);
  p.stroke(200);
  p.strokeWeight(1);
  p.rect(p.width - boxWidth - padding, p.height - boxHeight - padding, boxWidth, boxHeight, 2);
  p.pop();

  // Draw text
  p.textAlign(p.LEFT, p.TOP);
  p.fill(30);
  p.textStyle(p.NORMAL);
  p.textSize(14);

  const variableLabels = {
    temperature: 'Temperature',
    humidity: 'Humidity',
    soilMoisture: 'Soil Moisture',
    displacement: 'Displacement',
    vpd: 'VPD',
    treeMeanGrowth: 'Tree Mean Growth'
  };

  let y = p.height - boxHeight - padding + 8;

  variables.forEach((d) => {
    const label = variableLabels[d.key] ?? d.key;
    const rawValue = latest?.[d.key];
    const value = (typeof rawValue === 'number') 
      ? rawValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) 
      : (rawValue ?? ' -');
    // const value = latest?.[d.key] ?? ' -';
    const unit = units[d.key] ?? '';
    const labelText = `${label}: `;
    const valueText = ` ${value} ${unit}${(d.key === 'temperature') ? ` | ${celsiusToFahrenheit(rawValue || 0).toFixed(2)} ºF` : ''}`;
    const x = p.width - boxWidth;

    // Draw bold label
    p.textStyle(p.BOLD);
    p.text(labelText, x, y);

    // Measure width of label to offset the value text
    const labelWidth = p.textWidth(labelText);

    // Draw normal value text right after
    p.textStyle(p.NORMAL);
    p.text(valueText, x + labelWidth, y);

    y += lineHeight;
  });
}
}
