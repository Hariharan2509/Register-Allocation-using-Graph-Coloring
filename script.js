// --- Simple Graph Coloring Simulation --- //

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");

canvas.width = 800;
canvas.height = 400;

// Nodes and random connections
function generateGraph(numNodes = 6) {
  const graph = Array.from({ length: numNodes }, () => []);
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      if (Math.random() < 0.4) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }
  return graph;
}

// Graph coloring algorithm (Greedy)
function colorGraph(graph) {
  const n = graph.length;
  const colors = new Array(n).fill(-1);

  for (let u = 0; u < n; u++) {
    const used = new Set();
    for (let neighbor of graph[u]) {
      if (colors[neighbor] !== -1) used.add(colors[neighbor]);
    }

    let color = 0;
    while (used.has(color)) color++;
    colors[u] = color;
  }
  return colors;
}

// Draw graph visualization
function drawGraph(graph, colors) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const positions = [];
  const radius = 150;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < graph.length; i++) {
    const angle = (i / graph.length) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions.push({ x, y });
  }

  // Draw edges
  ctx.strokeStyle = "#aaa";
  for (let i = 0; i < graph.length; i++) {
    for (let j of graph[i]) {
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[j].x, positions[j].y);
      ctx.stroke();
    }
  }

  // Draw nodes
  const palette = ["#e53e3e", "#38a169", "#3182ce", "#d69e2e", "#805ad5", "#dd6b20"];
  for (let i = 0; i < positions.length; i++) {
    ctx.beginPath();
    ctx.arc(positions[i].x, positions[i].y, 25, 0, 2 * Math.PI);
    ctx.fillStyle = palette[colors[i] % palette.length];
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "16px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("V" + i, positions[i].x, positions[i].y);
  }
}

function runSimulation() {
  const graph = generateGraph(6);
  const colors = colorGraph(graph);
  drawGraph(graph, colors);

  const uniqueColors = new Set(colors);
  resultDiv.innerHTML = `
    🧩 <b>Registers used:</b> ${uniqueColors.size} <br>
    🎨 <b>Color Assignment:</b> ${colors.map((c, i) => `V${i}→R${c}`).join(", ")} <br>
    🌿 <b>SDG 12 Impact:</b> Efficient allocation reduces redundant computation, saving energy.
  `;
}

document.getElementById("simulateBtn").addEventListener("click", runSimulation);
