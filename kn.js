var clearFrame = function() {
    svg.innerHTML = '';
}

var makeDot = function(x, y) {

    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 30);
    dot.setAttribute("fill", "green");

    dot.addEventListener("click", clickDot);

    return dot;

}

var addDot = function(x, y) {
    svg.appendChild( makeDot( x, y ) );
}

var moveDot = function(e) {
    circles = document.getElementsByTagName("circle");
}

var clickDot = function(e) {
    if ( this.getAttribute("fill") != "pink" ) {	
	this.setAttribute("fill","pink");
	e.stopPropagation();
    }
    
    else {
	this.remove();
	var newCircle = addDot(Math.random() * svg.clientWidth, Math.random() * svg.clientHeight);
    };
    
};

svg.addEventListener("click", function(e) { addDot(e.offsetX, e.offsetY) });
svg.addEventListener("go", moveDot);
document.getElementById("clear").addEventListener("click", clearFrame);
