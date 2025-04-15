function getPrev(cur, range) {
	return (cur + range - 1) % range;
}

function getNext(cur, range) {
	return (cur + 1) % range;
}

export default function updateView(cur, dir) {
	let partners = document.querySelectorAll(".bubble");

    if (dir == -1) {
        partners[getNext(cur, partners.length)].setAttribute("id", "");
        partners[cur].setAttribute("id", "nxt");        
        cur = getPrev(cur, partners.length);
        partners[cur].setAttribute("id", "cur");        
        partners[getPrev(cur, partners.length)].setAttribute("id", "prv");
	} else {
        partners[getPrev(cur, partners.length)].setAttribute("id", "");
        partners[cur].setAttribute("id", "prv");
        cur = getNext(cur, partners.length);
	    partners[cur].setAttribute("id", "cur");
        partners[getNext(cur, partners.length)].setAttribute("id", "nxt");
	}

	return cur;
}
