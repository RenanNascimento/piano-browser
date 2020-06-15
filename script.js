WebMidi.enable((err) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  // Retrieve an input by name
  const input = WebMidi.getInputByName("DigitalKBD MIDI 1");

  // Listen for a 'note on' message on all channels
  input.addListener("noteon", "all", (e) => {
    console.log(`Received 'noteon' message (${e.note.name}${e.note.octave})`);
  });

  // Listen for a 'note off' message on all channels
  input.addListener("noteoff", "all", (e) => {
    console.log(`Received 'noteoff' message (${e.note.name}${e.note.octave})`);
  });
});
