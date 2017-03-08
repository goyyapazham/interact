var clearFrame = function() {
    svg.innerHTML = '';
}

var makeDot = function(x, y) {

    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 10);
    dot.setAttribute("fill", "green");

    return dot;

}

var addDot = function(e) {
    svg.appendChild( makeDot( e.offsetX, e.offsetY ) );
}

var moveDot = function(e) {
    circles = document.getElementsByTagName("circle");
}

svg.addEventListener("click", addDot);
svg.addEventListener("go", moveDot);
document.getElementById("clear").addEventListener("click", clearFrame);
