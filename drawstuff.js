/* classes */

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL = 
        "https://raw.githubusercontent.com/naisarg12/prog1_naisarg/gh-pages/triangles2.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input triangles

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputTriangles != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
        		// triangle position on canvas
        		
        		var v1 = [w*vertexPos1[0], h*vertexPos1[1]];
        		var v2 = [w*vertexPos2[0], h*vertexPos2[1]];
        		var v3 = [w*vertexPos3[0], h*vertexPos3[1]];
        		
        		// calculate triangle area on canvas (shoelace formula)
        		var triangleArea = 0.5*Math.abs(v1[0]*v2[1]+v2[0]*v3[1]+v3[0]*v1[1]-v2[0]*v1[1]-v3[0]*v2[1]-v1[0]*v3[1]);
        		var numTrianglePixels = triangleArea; // init num pixels in triangle
            	//console.log("triangle area " + triangleArea);
            	numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
            	numTrianglePixels = Math.round(numTrianglePixels);
            	// console.log("numTrianglePixels " + numTrianglePixels);
            	c.change(
            		inputTriangles[f].material.diffuse[0]*255,
                	inputTriangles[f].material.diffuse[1]*255,
                	inputTriangles[f].material.diffuse[2]*255,
                	255); // triangle diffuse color
            	for (var p=0; p<numTrianglePixels; p++) {
                    var point; // on canvas plane
            		var triangleTest = 0;
            		while (triangleTest == 0 ){ //if the pixel outside the triangle
                  
            			point = [Math.floor(Math.random()*w), Math.floor(Math.random()*h)];
                    	// plane checking
            			
                    	var t1 = ((point[0]-v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
                    	var t2 = ((point[0]-v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                    	var t3 = ((point[0]-v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;
                    	
                    	if((t1==t2)&&(t2==t3)) // draw the pixel if inside the triangle
                    		triangleTest = 1;
            		}
            		drawPixel(imagedata,point[0],point[1],c);
                	//console.log("color: ("+c.r+","+c.g+","+c.b+")");
                	//console.log("x: "+ x);
                	//console.log("y: "+ y);
            	} // end for pixels in triangle
        	} // end for triangles
    	} // end for files
        context.putImageData(imagedata, 0, 0);
    } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
// function drawInputTrianglesUsingPaths(context) {
//     var inputTriangles = getInputTriangles();
    
//     if (inputTriangles != String.null) { 
//         var w = context.canvas.width;
//         var h = context.canvas.height;

//         // Find the min and max coordinates to normalize the vertices
//         var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        
//         // Loop over all vertices to find the bounds
//         inputTriangles.forEach(file => {
//             file.vertices.forEach(vertex => {
//                 if (vertex[0] < minX) minX = vertex[0];
//                 if (vertex[0] > maxX) maxX = vertex[0];
//                 if (vertex[1] < minY) minY = vertex[1];
//                 if (vertex[1] > maxY) maxY = vertex[1];
//             });
//         });
        
//         // Normalize the vertices so they fit within the canvas
//         var scaleX = w / (maxX - minX);
//         var scaleY = h / (maxY - minY);

//         // Loop over the input files
//         inputTriangles.forEach(file => {
//             file.triangles.forEach(triangle => {
//                 var vertex1 = file.vertices[triangle[0]];
//                 var vertex2 = file.vertices[triangle[1]];
//                 var vertex3 = file.vertices[triangle[2]];

//                 // Apply normalization to vertex positions
//                 var v1 = [(vertex1[0] - minX) * scaleX, (vertex1[1] - minY) * scaleY];
//                 var v2 = [(vertex2[0] - minX) * scaleX, (vertex2[1] - minY) * scaleY];
//                 var v3 = [(vertex3[0] - minX) * scaleX, (vertex3[1] - minY) * scaleY];

//                 // Set the color for the triangle
//                 context.fillStyle = `rgb(
//                     ${Math.floor(file.material.diffuse[0] * 255)},
//                     ${Math.floor(file.material.diffuse[1] * 255)},
//                     ${Math.floor(file.material.diffuse[2] * 255)}
//                 )`;

//                 // Draw the triangle
//                 var path = new Path2D();
//                 path.moveTo(v1[0], v1[1]);
//                 path.lineTo(v2[0], v2[1]);
//                 path.lineTo(v3[0], v3[1]);
//                 path.closePath();
//                 context.fill(path);
//             });
//         });
//     }
// }
// Function to render unlit triangles using ray casting
function drawRayCastedTriangles(context) {
    var inputTriangles = getInputTriangles();
    
    if (inputTriangles != null) {
        var w = context.canvas.width;
        var h = context.canvas.height;
        
        var depthBuffer = new Array(w * h).fill(Infinity);
        var imagedata = context.createImageData(w, h);
        
        inputTriangles.forEach(file => {
            file.triangles.forEach(triangle => {
                var vertex1 = file.vertices[triangle[0]];
                var vertex2 = file.vertices[triangle[1]];
                var vertex3 = file.vertices[triangle[2]];
                
                // Convert to screen coordinates
                var v1 = [Math.round(w * vertex1[0]), Math.round(h * vertex1[1]), vertex1[2]];
                var v2 = [Math.round(w * vertex2[0]), Math.round(h * vertex2[1]), vertex2[2]];
                var v3 = [Math.round(w * vertex3[0]), Math.round(h * vertex3[1]), vertex3[2]];

                // Clip the triangle against the canvas
                var clippedTriangle = clipTriangle(v1, v2, v3, w, h);
                
                // If the triangle is valid after clipping
                if (clippedTriangle.length > 0) {
                    var color = {
                        r: file.material.diffuse[0] * 255,
                        g: file.material.diffuse[1] * 255,
                        b: file.material.diffuse[2] * 255,
                        a: 255
                    };
                    
                    clippedTriangle.forEach(clip => {
                        rasterizeTriangle(clip[0], clip[1], clip[2], color, depthBuffer, imagedata, w, h);
                    });
                }
            });
        });
        
        context.putImageData(imagedata, 0, 0);
    }
}

// Function to clip a triangle against the canvas boundaries
function clipTriangle(v1, v2, v3, canvasWidth, canvasHeight) {
    var clipped = [];

    // Implement the Sutherland-Hodgman algorithm or similar for clipping
    var vertices = [v1, v2, v3];
    var edges = [
        [0, 0, canvasWidth, 0],    // top edge
        [canvasWidth, 0, canvasWidth, canvasHeight], // right edge
        [canvasWidth, canvasHeight, 0, canvasHeight], // bottom edge
        [0, canvasHeight, 0, 0]     // left edge
    ];
    
    for (let edge of edges) {
        var newVertices = [];
        var [x1, y1, x2, y2] = edge;

        for (let i = 0; i < vertices.length; i++) {
            var current = vertices[i];
            var prev = vertices[(i + vertices.length - 1) % vertices.length];

            // Check if current vertex is inside the edge
            if (isInsideEdge(current, x1, y1, x2, y2)) {
                newVertices.push(current);
            }

            // Check if edge from prev to current intersects with the edge
            if (isInsideEdge(prev, x1, y1, x2, y2) !== isInsideEdge(current, x1, y1, x2, y2)) {
                var intersection = getIntersection(prev, current, x1, y1, x2, y2);
                if (intersection) {
                    newVertices.push(intersection);
                }
            }
        }

        vertices = newVertices;
        if (vertices.length === 0) return []; // no visible vertices
    }

    // Form triangles from the remaining vertices
    for (let i = 1; i < vertices.length - 1; i++) {
        clipped.push([vertices[0], vertices[i], vertices[i + 1]]);
    }

    return clipped;
}

// Function to check if a vertex is inside a given edge
function isInsideEdge(vertex, x1, y1, x2, y2) {
    var [x, y] = vertex;
    return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) && y <= Math.max(y1, y2));
}

// Function to get the intersection of a line segment with an edge
function getIntersection(p1, p2, x1, y1, x2, y2) {
    var [xA, yA] = p1;
    var [xB, yB] = p2;

    // Line segment AB represented as a1x + b1y = c1
    var a1 = yB - yA;
    var b1 = xA - xB;
    var c1 = a1 * xA + b1 * yA;

    // Line segment CD represented as a2x + b2y = c2
    var a2 = y2 - y1;
    var b2 = x1 - x2;
    var c2 = a2 * x1 + b2 * y1;

    var determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) return null; // Lines are parallel

    var x = (b2 * c1 - b1 * c2) / determinant;
    var y = (a1 * c2 - a2 * c1) / determinant;

    return [x, y];
}

// Rasterize the triangle using Barycentric coordinates and depth buffer
function rasterizeTriangle(v1, v2, v3, color, depthBuffer, imagedata, w, h) {
    // Compute bounding box for the triangle
    var minX = Math.max(Math.min(v1[0], v2[0], v3[0]), 0);
    var maxX = Math.min(Math.max(v1[0], v2[0], v3[0]), w - 1);
    var minY = Math.max(Math.min(v1[1], v2[1], v3[1]), 0);
    var maxY = Math.min(Math.max(v1[1], v2[1], v3[1]), h - 1);

    // Loop through all pixels in the bounding box
    for (var x = minX; x <= maxX; x++) {
        for (var y = minY; y <= maxY; y++) {
            // Use Barycentric coordinates to test if the point is inside the triangle
            var barycentric = getBarycentricCoordinates(x, y, v1, v2, v3);
            if (barycentric[0] >= 0 && barycentric[1] >= 0 && barycentric[2] >= 0) {
                // Compute depth (z-value) for depth testing
                var z = barycentric[0] * v1[2] + barycentric[1] * v2[2] + barycentric[2] * v3[2];

                // Check depth buffer
                var pixelIndex = (y * w + x);
                if (z < depthBuffer[pixelIndex]) {
                    depthBuffer[pixelIndex] = z;  // Update depth buffer
                    drawPixel(imagedata, x, y, color);  // Update color buffer
                }
            }
        }
    }
}

// Get Barycentric coordinates of point (px, py) with respect to the triangle (v1, v2, v3)
function getBarycentricCoordinates(px, py, v1, v2, v3) {
    var detT = (v2[1] - v3[1]) * (v1[0] - v3[0]) + (v3[0] - v2[0]) * (v1[1] - v3[1]);
    if (detT === 0) return [-1, -1, -1];  // Prevent divide by zero for degenerate triangles
    var lambda1 = ((v2[1] - v3[1]) * (px - v3[0]) + (v3[0] - v2[0]) * (py - v3[1])) / detT;
    var lambda2 = ((v3[1] - v1[1]) * (px - v3[0]) + (v1[0] - v3[0]) * (py - v3[1])) / detT;
    var lambda3 = 1 - lambda1 - lambda2;
    return [lambda1, lambda2, lambda3];
}

// The rest of your utility functions remain the same, including the Color class and drawPixel function.



/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Create the image
    //drawRandPixels(context);
      // shows how to draw pixels
    
    //drawRandPixelsInInputEllipsoids(context);
      // shows how to draw pixels and read input file
      
    //drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels
    
    //drawRandPixelsInInputTriangles(context);
      // shows how to draw pixels and read input file
    
    // drawInputTrianglesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels

    drawRayCastedTriangles(context);
	
    //drawRandPixelsInInputBoxes(context);
      // shows how to draw pixels and read input file
    
    //drawInputBoxesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels
}
