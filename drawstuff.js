/* classes */ 

// Color constructor
class Color {
            
    // Color constructor default opaque black
constructor(r=0,g=0,b=0,a=255) {
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
            return(this);
        }
    } // end throw
    
    catch (e) {
        console.log(e);
    }
} // end Color change method

    // Color add method
add(c) {
    try {
        if (!(c instanceof Color))
            throw "Color.add: non-color parameter";
        else {
            this.r += c.r; this.g += c.g; this.b += c.b; this.a += c.a;
            return(this);
        }
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end color add

    // Color subtract method
subtract(c) {
    try {
        if (!(c instanceof Color))
            throw "Color.subtract: non-color parameter";
        else {
            this.r -= c.r; this.g -= c.g; this.b -= c.b; this.a -= c.a;
            return(this);
        }
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end color subgtract

    // Color scale method
scale(s) {
    try {
        if (typeof(s) !== "number")
            throw "scale factor not a number";
        else {
            this.r *= s; this.g *= s; this.b *= s; this.a *= s; 
            return(this);
        }
    } // end throw
    
    catch (e) {
        console.log(e);
    }
} // end Color scale method

    // Color copy method
copy(c) {
    try {
        if (!(c instanceof Color))
            throw "Color.copy: non-color parameter";
        else {
            this.r = c.r; this.g = c.g; this.b = c.b; this.a = c.a;
            return(this);
        }
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end Color copy method

    // Color clone method
clone() {
    var newColor = new Color();
    newColor.copy(this);
    return(newColor);
} // end Color clone method

    // translate color to string
toString() {
    return(this.r +" "+ this.g +" "+ this.b +" "+ this.a);
}  // end Color toConsole

    // Send color to console
toConsole() {
    console.log(this.toString());
}  // end Color toConsole

} // end color class

// Vector class
class Vector { 
constructor(x,y,z) {
    this.set(x,y,z);
} // end constructor

// sets the components of a vector
set(x,y,z) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
            throw "vector component not a number";
        else
            this.x = x; this.y = y; this.z = z; 
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end vector set

// copy the passed vector into this one
copy(v) {
    try {
        if (!(v instanceof Vector))
            throw "Vector.copy: non-vector parameter";
        else
            this.x = v.x; this.y = v.y; this.z = v.z;
    } // end try
    
    catch(e) {
        console.log(e);
    }
}

toConsole(prefix="") {
    console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
} // end to console

// static dot method
static dot(v1,v2) {
    try {
        if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
            throw "Vector.dot: non-vector parameter";
        else
            return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
    } // end try
    
    catch(e) {
        console.log(e);
        return(NaN);
    }
} // end dot static method

// static cross method
static cross(v1,v2) {
    try {
        if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
            throw "Vector.cross: non-vector parameter";
        else {
            var crossX = v1.y*v2.z - v1.z*v2.y;
            var crossY = v1.z*v2.x - v1.x*v2.z;
            var crossZ = v1.x*v2.y - v1.y*v2.x;
            return(new Vector(crossX,crossY,crossZ));
        } // endif vector params
    } // end try
    
    catch(e) {
        console.log(e);
        return(NaN);
    }
} // end dot static method

// static add method
static add(v1,v2) {
    try {
        if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
            throw "Vector.add: non-vector parameter";
        else
            return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
    } // end try
    
    catch(e) {
        console.log(e);
        return(new Vector(NaN,NaN,NaN));
    }
} // end add static method

// static subtract method, v1-v2
static subtract(v1,v2) {
    try {
        if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
            throw "Vector.subtract: non-vector parameter";
        else {
            var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
            return(v);
        }
    } // end try
    
    catch(e) {
        console.log(e);
        return(new Vector(NaN,NaN,NaN));
    }
} // end subtract static method

// static scale method
static scale(c,v) {
    try {
        if (!(typeof(c) === "number") || !(v instanceof Vector))
            throw "Vector.scale: malformed parameter";
        else
            return(new Vector(c*v.x,c*v.y,c*v.z));
    } // end try
    
    catch(e) {
        console.log(e);
        return(new Vector(NaN,NaN,NaN));
    }
} // end scale static method

// static normalize method
static normalize(v) {
    try {
        if (!(v instanceof Vector))
            throw "Vector.normalize: parameter not a vector";
        else {
            var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
            return(Vector.scale(lenDenom,v));
        }
    } // end try
    
    catch(e) {
        console.log(e);
        return(new Vector(NaN,NaN,NaN));
    }
} // end scale static method

} // end Vector class



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
drawPixel.numExcepts = (drawPixel.numExcepts == "undefined") ? 0 : drawPixel.numExcepts;
if (drawPixel.numExcepts++ < 10)
    console.log(e);
}
} // end drawPixel

// // Function to compute the normal vector of a triangle
// function computeNormal(a, b, c) {
// const v0 = Vector.subtract(b, a);
// const v1 = Vector.subtract(c, a);
// return Vector.cross(v0, v1);
// }

function computeNormal(A, B, C) {
    const AB = new Vector(B.x - A.x, B.y - A.y, B.z - A.z);
    const AC = new Vector(C.x - A.x, C.y - A.y, C.z - A.z);
    
    // Cross product
    const normal = Vector.cross(AB, AC);
    
    // Normalize the normal
    const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
    
    // Return the normalized vector
    return new Vector(normal.x / length, normal.y / length, normal.z / length);
}

// Function to find intersection of ray with plane
function intersectRayWithPlane(eye, rayDirection, triangle) {
const P0 = triangle[0];
const N = computeNormal(triangle[0], triangle[1], triangle[2]);

const D = rayDirection; // Direction of the ray
const O = eye; // Origin of the ray

// Plane equation: N · (P - P0) = 0
// Ray equation: P = O + tD
// Substitute into plane equation
const denom = Vector.dot(N, D);
if (denom === 0) {
return null; // The ray is parallel to the plane
}

const t = -Vector.dot(N, Vector.subtract(O, P0)) / denom;
if (t < 1) {
return null; // The intersection point is behind the ray's origin
}

// Find intersection point
return Vector.add(O, Vector.scale(t, D));
}

// Function to check if a point is inside the triangle
function isPointInsideTriangle(point, triangle) {
const a = triangle[0];
const b = triangle[1];
const c = triangle[2];

// Compute normal vectors for each side of the triangle
const n1 = Vector.cross(Vector.subtract(b, a), Vector.subtract(point, a));
const n2 = Vector.cross(Vector.subtract(c, b), Vector.subtract(point, b));
const n3 = Vector.cross(Vector.subtract(a, c), Vector.subtract(point, c));

// Check if all normals point in the same direction
return (
Vector.dot(n1, computeNormal(a, b, c)) >= 0 &&
Vector.dot(n2, computeNormal(b, c, a)) >= 0 &&
Vector.dot(n3, computeNormal(c, a, b)) >= 0
);
}

// const triangleVertices = [
//         new Vector(0.25, 0.25, 0.25),   // Vertex A
//         new Vector(0.5, 0.75, 0.25),  // Vertex B
//         new Vector(0.75,0.25,0.25)    // Vertex C
//     ];

 const triangleColor = new Color(255, 0, 0, 255); // Red color for the triangle


// //get the input triangles from the standard class URL
function getInputTriangles() {
const INPUT_TRIANGLES_URL = 
    "https://ncsucgclass.github.io/prog1/triangles2.json";
    
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


function convertToVector() {

const allTriangleVertices = [];
const allTriangleColors = [];
var inputTriangles = getInputTriangles();
var n = inputTriangles.length; // the number of input files
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

        // Create instances of Vector
        var triangleVertices = [
            new Vector(vertexPos1[0], vertexPos1[1], vertexPos1[2]),  // Vertex A
            new Vector(vertexPos2[0], vertexPos2[1], vertexPos2[2]),  // Vertex B
            new Vector(vertexPos3[0], vertexPos3[1], vertexPos3[2])   // Vertex C
        ];

        var triangleColor = new Color(inputTriangles[f].material.diffuse[0]*255, inputTriangles[f].material.diffuse[1]*255, inputTriangles[f].material.diffuse[2]*255, 255);

        allTriangleColors.push(triangleColor);
        allTriangleVertices.push(triangleVertices);

    }
}
return {
    allTriangleVerts: allTriangleVertices,
    allTriangleClrs: allTriangleColors
};
}


// Main function to render the triangle
function main() {
    // Get the canvas, context, and image data
    const canvas = document.getElementById("viewport");
    const context = canvas.getContext("2d");
    const w = context.canvas.width;
    const h = context.canvas.height;
    const imagedata = context.createImageData(w, h);
    const {allTriangleVerts, allTriangleClrs} = convertToVector();

    // Eye position
    const eye = new Vector(0.5, 0.5, -0.5); // Eye at the origin

    // Loop through each pixel on the screen
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const pixelIndex = (y * w + x) * 4;
            const screenPoint = new Vector((x + 0.5) / w, 1 - (y + 0.5) / h, 0); // Screen point in 2D
            const rayDirection = Vector.subtract(screenPoint, eye);

            let closestIntersection = null;
            let closestColor = new Color(0, 0, 0, 255); // Default color (black)
            let closestDistance = Infinity; // Start with an infinitely large distance

            for (let i = 0; i < allTriangleVerts.length; i++) {
                const triangleVertices = allTriangleVerts[i];
                const triangleColor = allTriangleClrs[i];

                // First check for intersection with the triangle's plane
                const intersection = intersectRayWithPlane(eye, rayDirection, triangleVertices);
                if (intersection && isPointInsideTriangle(intersection, triangleVertices)) {
                    const distance = Vector.dot(Vector.subtract(intersection, eye), Vector.subtract(intersection, eye)); // Squared distance
                    if (distance < closestDistance) {
                        closestDistance = distance; // Update closest distance
                        closestIntersection = intersection; // Save the intersection
                        closestColor = triangleColor; // Save the triangle color
                    }
                }
            }

            // Draw the closest color if there was an intersection
            if (closestIntersection) {
                drawPixel(imagedata, x, y, closestColor);
                console.log(Drawing pixel at (${x}, ${y}) with color ${closestColor.toString()});
            } else {
                // If no intersection, draw background or default color
                imagedata.data[pixelIndex] = closestColor.r;
                imagedata.data[pixelIndex + 1] = closestColor.g;
                imagedata.data[pixelIndex + 2] = closestColor.b;
                imagedata.data[pixelIndex + 3] = closestColor.a;
            }
        }
    }

    console.log("Rendering finished..."); // Debugging line
    // Display the image in the context
    context.putImageData(imagedata, 0, 0);
}
