var rid = 0;

var clearFrame = function() {
    svg.innerHTML = '';
}

var makeDot = function(x, y) {

    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 30);
    dot.setAttribute("fill", "green");

    dot.xv = 1;
    dot.yv = 1;

    dot.addEventListener("click", clickDot);

    return dot;

}

var addDot = function(e) {
    svg.appendChild( makeDot( e.offsetX, e.offsetY ) );
}

var moveDot = function(e) {

    window.cancelAnimationFrame(rid);

    var woo = function() {

	var circles = document.getElementsByTagName("circle");
	
	for( var i = 0; i < circles.length; i++ ) {

	    var x = parseInt( circles[i].getAttribute("cx") );
	    var y = parseInt( circles[i].getAttribute("cy") );

	    if( x < 30 || x > svg.clientWidth - 30 )
		circles[i].xv *= -1;

	    if( y < 30 || y > svg.clientHeight - 30 )
		circles[i].yv *= -1;

	    circles[i].setAttribute( "cx", x + circles[i].xv );
	    circles[i].setAttribute( "cy", y + circles[i].yv );

	}

	rid = window.requestAnimationFrame(woo);

    }

    woo();

    //setInterval( woo, 15 );
	
}

var clickDot = function(e) {
    
    if ( this.getAttribute("fill") != "pink" ) {
	this.setAttribute("fill", "pink");
    }
    
    else {
	
	svg.removeChild( this );
	
	var newDot = makeDot( Math.random() * svg.clientWidth,
			      Math.random() * svg.clientHeight );
	
	svg.appendChild( newDot );
    };

    e.stopPropagation();
    
};

svg.addEventListener("click", addDot);
go.addEventListener("click", moveDot);
document.getElementById("clear").addEventListener("click", clearFrame);
