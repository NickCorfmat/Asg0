/*
Name: Nick Corfmat
Email: ncorfmat@ucsc.edu
*/

function main() {
  // Retrieve the <canvas> element
  canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return false;
  }

  // Get the rendering context for 2DCG
  ctx = canvas.getContext("2d");

  // Draw a blue rectangle
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)"; // Set a blue color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
}

function drawVector(v, color) {
  ctx.strokeStyle = color;

  // get center canvas coordinates
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;

  const scale = 20;

  // draw vector
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + v.elements[0] * scale, cy - v.elements[1] * scale);
  ctx.stroke();
}

function handleDrawEvent() {
  clearCanvas();

  // Vector 1
  const x1 = document.getElementById("v1-x").value;
  const y1 = document.getElementById("v1-y").value;

  const v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, "red");

  // Vector 2
  const x2 = document.getElementById("v2-x").value;
  const y2 = document.getElementById("v2-y").value;

  const v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  clearCanvas();

  // Vector 1
  const x1 = document.getElementById("v1-x").value;
  const y1 = document.getElementById("v1-y").value;

  const v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, "red");

  // Vector 2
  const x2 = document.getElementById("v2-x").value;
  const y2 = document.getElementById("v2-y").value;

  const v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");

  let v3, v4;

  const operation = document.getElementById("operation-select").value;
  const scalar = document.getElementById("scalar").value;

  // Perform Vector operation
  switch (operation) {
    case "add":
      v3 = v1.add(v2);

      drawVector(v3, "green");
      break;
    case "sub":
      v3 = v1.sub(v2);

      drawVector(v3, "green");
      break;
    case "mult":
      v3 = v1.mul(scalar);
      v4 = v2.mul(scalar);

      drawVector(v3, "green");
      drawVector(v4, "green");
      break;
    case "div":
      v3 = v1.div(scalar);
      v4 = v2.div(scalar);

      drawVector(v3, "green");
      drawVector(v4, "green");
      break;
    case "mag":
      const m1 = v1.magnitude();
      const m2 = v2.magnitude();

      console.log(`Magnitude v1: ${m1}\nMagnitude v2: ${m2}`);
      break;
    case "norm":
      v3 = v1.normalize();
      v4 = v2.normalize();

      drawVector(v3, "green");
      drawVector(v4, "green");
      break;
    case "angle":
      angleBetween(v1, v2);
      break;
    case "area":
      areaTriangle(v1, v2);
      break;
    default:
      break;
  }
}

function angleBetween(v1, v2) {
  const dot = Vector3.dot(v1, v2);

  const m1 = v1.magnitude();
  const m2 = v2.magnitude();

  const radians = Math.acos(dot / (m1 * m2));
  const degrees = radians * (180 / Math.PI);

  console.log(`Angle: ${degrees}`);
}

function areaTriangle(v1, v2) {
  let v3 = Vector3.cross(v1, v2);
  const area = v3.magnitude() / 2;

  console.log(`Area of Triangle: ${area}`);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
