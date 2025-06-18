// Note definitions - one octave starting from C
export const NOTES = [
    { sharp: 'C', flat: 'C', type: 'white', id: 0 },
    { sharp: 'C#', flat: 'Db', type: 'black', id: 1 },
    { sharp: 'D', flat: 'D', type: 'white', id: 2 },
    { sharp: 'D#', flat: 'Eb', type: 'black', id: 3 },
    { sharp: 'E', flat: 'E', type: 'white', id: 4 },
    { sharp: 'F', flat: 'F', type: 'white', id: 5 },
    { sharp: 'F#', flat: 'Gb', type: 'black', id: 6 },
    { sharp: 'G', flat: 'G', type: 'white', id: 7 },
    { sharp: 'G#', flat: 'Ab', type: 'black', id: 8 },
    { sharp: 'A', flat: 'A', type: 'white', id: 9 },
    { sharp: 'A#', flat: 'Bb', type: 'black', id: 10 },
    { sharp: 'B', flat: 'B', type: 'white', id: 11 }
];

// Common scales and chords data (intervals from root note)
export const SCALES = {
    // Major Scales
    'C Major': [0, 2, 4, 5, 7, 9, 11],
    'C# Major': [1, 3, 5, 6, 8, 10, 0],
    'D♭ Major': [1, 3, 5, 6, 8, 10, 0],
    'D Major': [2, 4, 6, 7, 9, 11, 1],
    'D# Major': [3, 5, 7, 8, 10, 0, 2],
    'E♭ Major': [3, 5, 7, 8, 10, 0, 2],
    'E Major': [4, 6, 8, 9, 11, 1, 3],
    'F Major': [5, 7, 9, 10, 0, 2, 4],
    'F# Major': [6, 8, 10, 11, 1, 3, 5],
    'G♭ Major': [6, 8, 10, 11, 1, 3, 5],
    'G Major': [7, 9, 11, 0, 2, 4, 6],
    'G# Major': [8, 10, 0, 1, 3, 5, 7],
    'A♭ Major': [8, 10, 0, 1, 3, 5, 7],
    'A Major': [9, 11, 1, 2, 4, 6, 8],
    'A# Major': [10, 0, 2, 3, 5, 7, 9],
    'B♭ Major': [10, 0, 2, 3, 5, 7, 9],
    'B Major': [11, 1, 3, 4, 6, 8, 10]
};

export const CHORDS = {
    // Major Chords
    'C Major': [0, 4, 7],
    'C# Major': [1, 5, 8],
    'D♭ Major': [1, 5, 8],
    'D Major': [2, 6, 9],
    'D# Major': [3, 7, 10],
    'E♭ Major': [3, 7, 10],
    'E Major': [4, 8, 11],
    'F Major': [5, 9, 0],
    'F# Major': [6, 10, 1],
    'G♭ Major': [6, 10, 1],
    'G Major': [7, 11, 2],
    'G# Major': [8, 0, 3],
    'A♭ Major': [8, 0, 3],
    'A Major': [9, 1, 4],
    'A# Major': [10, 2, 5],
    'B♭ Major': [10, 2, 5],
    'B Major': [11, 3, 6]
}; 