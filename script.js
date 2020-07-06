document.addEventListener("keydown", getKey);

function addElement(note) {
  const newDiv = document.createElement("div");
  newDiv.id = "block";
  newDiv.className = "block";
  const currentDiv = document.getElementById(note);
  currentDiv.appendChild(newDiv, currentDiv);
}

function removeAnimation(note) {
  const newDiv = document.createElement("div");
  newDiv.id = "block-remove";
  newDiv.className = "block-remove";
  const currentDiv = document.getElementById(note);
  currentDiv.appendChild(newDiv, currentDiv);
}

function getKey(e) {
  if (e.code == "KeyC") {
    addElement();
  }
  if (e.code == "KeyX") {
    removeAnimation();
  }
}

WebMidi.enable((err) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  // Retrieve an input by name
  const input = WebMidi.getInputByName("Digital Piano MIDI 1");

  // Listen for a 'note on' message on all channels
  input.addListener("noteon", "all", (e) => {
    console.log(`Received 'noteon' message (${e.note.name}${e.note.octave})`);
    addElement(`${e.note.name}${e.note.octave}`);
  });

  // Listen for a 'note off' message on all channels
  input.addListener("noteoff", "all", (e) => {
    console.log(`Received 'noteoff' message (${e.note.name}${e.note.octave})`);
    removeAnimation(`${e.note.name}${e.note.octave}`);
  });
});
