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

	//var regex = /^([cdefgab]#?){1}(maj?|min?|m?|dim?|aug?|sus?|sus2?|sus4?)?(7?|9?|11?|13?)?(sus?|sus2?|sus4?)?\/?([cdefgab]#?)?$/g;
	var regex = /^([cdefgab]#?){1}(maj|min|mi|m|dim|di|aug|au|s|su|sus|sus2|sus4)?(7?|9?|11?|13?)?(s|su|sus|sus2|sus4)?(fl|fla|flat|flat5)?\/?([cdefgab]#?)?$/g;
	var match = regex.exec(input);

	if(!match) return;

	var notation = match[0];
	var r = match[1]; // root
	var type = match[2]; // triad type
	var num = match[3]; // seventh, ninth, etc
	var sus = match[4]; // suspensions
	var halfDim = match[5]; // half diminished sevenths
	var inversion = match[6]; // chord inversions
	var dominant7th = false;

	if(["a", "a#", "b"].includes(r)) {
		r = r + "-1";
	}

	var notes = buildMajor(r);

	if(type) {
		// maj, min, m, dim, sus
		if(["min", "m", "mi"].includes(type)) {
			notes = buildMinor(r);
		} else if(type == "dim") {
			notes = buildDim(r);
		} else if(type == "aug") {
			notes = buildAug(r);
		} else if (type == "sus2") {
			notes[1] = notes[1] - 2;
		} else if (type == "sus4") {
			// this doesn't seem to be capturing sus?
			notes[1] = notes[1] + 1;
		}
	}

	if(num) {
		// 7, 9
		if(type == "maj") {
			if(num == "7") {
				notes.push(notes[0] + 11);
			} else if(num == "9") {
				notes.push(notes[0] + 11);
				notes.push(notes[0] + 14);
			}
		} else if(type == "dim") {
			if(num == "7") {
				notes.push(notes[0] + 9);
			}
		} else if(["m", "min"].includes(type)){
			if(num == "7") {
				notes.push(notes[0] + 10);
			} else if(num == "9") {
				notes.push(notes[0] + 10);
				notes.push(notes[0] + 14);
			}
		} else {
			if(num == "7") {
				dominant7th = true;
				notes.push(notes[0] + 10);
			} else if(num == "9") {
				dominant7th = true;
				notes.push(notes[0] + 10);
				notes.push(notes[0] + 14);
			}
		}
	}

	if(sus && (type == "maj" || dominant7th)) {
		if (sus == "sus2") {
			notes[1] = notes[1] - 2;
		} else if (sus == "sus4") {
			notes[1] = notes[1] + 1;
		}
	}

	if(halfDim == "flat5" && ["min", "m", "mi"].includes(type)) {
		notes[2] = notes[2] - 1;
	}

	// need to find closest bass note
	// work in progress for inversions, v complex? 
	// if(inversion && notation.includes("/")) {
	// 	notes.unshift(keyboard.findIndex(key => {
	// 		return key == inversion + "-1";
	// 	}));
	// }

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

