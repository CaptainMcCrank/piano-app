// Helper function to check if a scale uses sharps or flats
export const getAccidentalType = (scaleName) => {
  return scaleName.includes('#') ? 'sharp' : (scaleName.includes('♭') || scaleName.includes('b')) ? 'flat' : 'sharp';
};

// Helper function to get expected notes for a scale (traditional note names only)
export const getExpectedScaleNotes = (scaleName) => {
  const scaleMap = {
    'C Major': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'C# Major': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
    'D♭ Major': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    'D Major': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'D# Major': ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
    'E♭ Major': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'E Major': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F Major': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'F# Major': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
    'G♭ Major': ['Gb', 'Ab', 'Bb', 'B', 'Db', 'Eb', 'F'],
    'G Major': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'G# Major': ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
    'A♭ Major': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'A Major': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'A# Major': ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
    'B♭ Major': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'B Major': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
  };
  return scaleMap[scaleName] || [];
};

// Helper function to get expected notes for a chord (traditional note names only)
export const getExpectedChordNotes = (chordName) => {
  const chordMap = {
    'C Major': ['C', 'E', 'G'],
    'C# Major': ['C#', 'F', 'G#'],
    'D♭ Major': ['Db', 'F', 'Ab'],
    'D Major': ['D', 'F#', 'A'],
    'D# Major': ['D#', 'G', 'A#'],
    'E♭ Major': ['Eb', 'G', 'Bb'],
    'E Major': ['E', 'G#', 'B'],
    'F Major': ['F', 'A', 'C'],
    'F# Major': ['F#', 'A#', 'C#'],
    'G♭ Major': ['Gb', 'Bb', 'Db'],
    'G Major': ['G', 'B', 'D'],
    'G# Major': ['G#', 'C', 'D#'],
    'A♭ Major': ['Ab', 'C', 'Eb'],
    'A Major': ['A', 'C#', 'E'],
    'A# Major': ['A#', 'D', 'F'],
    'B♭ Major': ['Bb', 'D', 'F'],
    'B Major': ['B', 'D#', 'F#']
  };
  return chordMap[chordName] || [];
};

// Helper function to check if notes are consistent with accidental type
export const checkAccidentalConsistency = (notes, accidentalType) => {
  if (accidentalType === 'sharp') {
    return notes.every(note => !note.includes('b'));
  } else {
    return notes.every(note => !note.includes('#'));
  }
}; 