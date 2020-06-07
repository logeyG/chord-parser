var keyboard = [
// -1 used as bass notes
'c-1', 'c#-1', 'd-1', 'd#-1', 'e-1', 'f-1', 'f#-1', 'g-1', 'g#-1', 'a-1', 'a#-1', 'b-1',
'c',  'c#',  'd',  'd#',  'e',  'f',  'f#',  'g',  'g#',  'a',  'a#',  'b',
'c2', 'c#2', 'd2', 'd#2', 'e2', 'f2', 'f#2', 'g2', 'g#2', 'a2', 'a#2', 'b2'];

function parse(input) {
	var elements = document.getElementById("keyboard").children;
	Array.from(elements).forEach(e => {
		e.classList.remove("hlight");
	})

	if(!input) return;

	input = input.toLowerCase();

	var regex = /^([cdefgab]#?){1}(maj?|min?|m?|dim?|aug?|sus?|sus2?|sus4?)?(7?|9?|11?|13?)?\/?([cdefgab]#?)?$/g;
	var match = regex.exec(input);

	if(!match) return;

	var r = match[1]; // root
	var type = match[2]; // triad type
	var num = match[3]; // seventh, ninth, etc
	var inversion = match[4]; // chord inversions

	var notes = buildMajor(r);

	if(type) {
		// maj, min, m, dim, sus
		if(type == "min" || type == "m") {
			notes = buildMinor(r);
		} else if(type == "dim") {
			notes = buildDim(r);
		} else if(type == "aug") {
			notes = buildAug(r);
		} else if (type == "sus2") {
			notes[1] = notes[1] - 2;
		} else if (type == "sus" || type == "sus4") {
			notes[1] = notes[1] + 1;
		}
	}

	if(num) {
		// 7, 9, 11, 13
		if(type == "maj" || type == "min") {
			if(num == "7") {
				notes.push(notes[2] + 4)
			}
		} else {
			if(num == "7") {
				notes.push(notes[2] + 3)
			}
		}
	}

	// need to find closest bass note
	if(inversion) {
		notes.unshift(keyboard.findIndex(key => {
			return key == inversion + "-1";
		}));
	}

	notes.forEach(n => {
		var note = document.getElementById(keyboard[n]);
		note.classList.add("hlight");
	})	
}

function buildMajor(input) {
	var r = keyboard.findIndex(key => {
		return key == input;
	});

	return [r, r + 4, r + 4 + 3];
}

function buildMinor(input) {
	var r = keyboard.findIndex(key => {
		return key == input;
	});

	return [r, r + 3, r + 3 + 4];
}

function buildSus(input) {
	// ?
}

function buildAug(input) {
	var r = keyboard.findIndex(key => {
		return key == input.charAt(0);
	});

	return [r, r + 4, r + 4 + 4];
}

function buildDim(input) {
	var r = keyboard.findIndex(key => {
		return key == input.charAt(0);
	});

	return [r, r + 3, r + 3 + 3];
}

document.addEventListener("DOMContentLoaded", function(event) {
	var i = document.getElementById('chord-input');
	i.addEventListener('input', function() {
		parse(i.value);
	}, false);
});

