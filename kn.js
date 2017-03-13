var rid = 0;

var clearFrame = function() {
    svg.innerHTML = '';
}

var makeDot = function(x, y) {

    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 20);
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

	    var r = parseInt( circles[i].getAttribute("r") );

	    if( r <= 1 ) {
		svg.removeChild( circles[i] );
		break;
	    }

	    var x = parseInt( circles[i].getAttribute("cx") );
	    var y = parseInt( circles[i].getAttribute("cy") );

	    if( x < 30 || x > svg.clientWidth - 30 )
		circles[i].xv *= -1;

	    if( y < 30 || y > svg.clientHeight - 30 )
		circles[i].yv *= -1;

	    x += circles[i].xv; circles[i].setAttribute( "cx", x );
	    y += circles[i].yv; circles[i].setAttribute( "cy", y );

	    var x2 = svg.clientWidth / 2;
	    var y2 = svg.clientHeight / 2;
	    r = r / 2;

	    if( Math.abs(x2 - x) <= 5 && Math.abs(y2 - y) <= 5 ) {

		circles[i].setAttribute("r", r);

		var newDot = makeDot(x, y);
		
		newDot.setAttribute("xv", -1 * circles[i].xv);
		newDot.setAttribute("yv", -1 * circles[i].yv);
		newDot.setAttribute("r", r);

		svg.appendChild(newDot);
		
	    }

	}

	rid = window.requestAnimationFrame(woo);

    }

    woo();
	
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
