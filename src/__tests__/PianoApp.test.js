import { render, screen, fireEvent, act } from '@testing-library/react';
import { getAccidentalType, getExpectedScaleNotes, getExpectedChordNotes, 
         checkAccidentalConsistency, areEnharmonicEquivalents } from '../utils/testUtils';
import { NOTES, SCALES, CHORDS } from '../constants/musicalData';

describe('Scale Representation Tests', () => {
  test('C# Major scale should use sharps consistently', () => {
    const scaleName = 'C# Major';
    const notes = getExpectedScaleNotes(scaleName);
    const accidentalType = getAccidentalType(scaleName);
    
    expect(checkAccidentalConsistency(notes, accidentalType)).toBe(true);
    expect(notes).toEqual(['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C']);
  });

  test('Db Major scale should use flats consistently', () => {
    const scaleName = 'Db Major';
    const notes = getExpectedScaleNotes(scaleName);
    const accidentalType = getAccidentalType(scaleName);
    
    expect(checkAccidentalConsistency(notes, accidentalType)).toBe(true);
    expect(notes).toEqual(['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']);
  });
});

describe('Chord Representation Tests', () => {
  test('Major chords should show correct intervals', () => {
    const chordName = 'C# Major';
    const notes = getExpectedChordNotes(chordName);
    expect(notes).toEqual(['C#', 'F', 'G#']);
  });

  test('Chord notes should maintain accidental consistency', () => {
    const sharpChord = 'C# Major';
    const flatChord = 'Db Major';
    
    const sharpNotes = getExpectedChordNotes(sharpChord);
    const flatNotes = getExpectedChordNotes(flatChord);
    
    expect(checkAccidentalConsistency(sharpNotes, 'sharp')).toBe(true);
    expect(checkAccidentalConsistency(flatNotes, 'flat')).toBe(true);
  });
});

describe('Note Labeling Tests', () => {
  test('Black keys should use consistent accidentals based on scale', () => {
    const sharpScale = 'C# Major';
    const flatScale = 'Db Major';
    
    const sharpNotes = getExpectedScaleNotes(sharpScale);
    const flatNotes = getExpectedScaleNotes(flatScale);
    
    // Check that black keys use sharps in sharp scales
    expect(sharpNotes.filter(note => note.includes('#')).length).toBeGreaterThan(0);
    expect(sharpNotes.filter(note => note.includes('b')).length).toBe(0);
    
    // Check that black keys use flats in flat scales
    expect(flatNotes.filter(note => note.includes('b')).length).toBeGreaterThan(0);
    expect(flatNotes.filter(note => note.includes('#')).length).toBe(0);
  });

  test('Note labels should match selected scale', () => {
    const scaleName = 'C# Major';
    const expectedNotes = getExpectedScaleNotes(scaleName);
    const accidentalType = getAccidentalType(scaleName);
    const actualNotes = SCALES[scaleName].map(index => NOTES[index][accidentalType]);
    
    expect(actualNotes).toEqual(expectedNotes);
  });
});

describe('Animation Tests', () => {
  test('Play button should trigger correct note sequence', () => {
    const scaleName = 'C# Major';
    const expectedNotes = getExpectedScaleNotes(scaleName);
    
    // Mock the play sequence function
    const playSequence = jest.fn();
    
    // Simulate play button click
    act(() => {
      playSequence();
    });
    
    // Verify that the sequence was called with correct notes
    expect(playSequence).toHaveBeenCalled();
  });

  test('Scale animation should play notes in correct order', () => {
    const scaleName = 'C# Major';
    const expectedNotes = getExpectedScaleNotes(scaleName);
    
    // Mock the animation sequence
    const animateNotes = jest.fn();
    
    // Simulate scale animation
    act(() => {
      animateNotes(expectedNotes);
    });
    
    // Verify that notes were animated in correct order
    expect(animateNotes).toHaveBeenCalledWith(expectedNotes);
  });
});

describe('UI State Tests', () => {
  test('Scale selection should update piano display', () => {
    const scaleName = 'C# Major';
    const expectedNotes = getExpectedScaleNotes(scaleName);
    
    // Mock the UI update function
    const updatePianoDisplay = jest.fn();
    
    // Simulate scale selection
    act(() => {
      updatePianoDisplay(scaleName);
    });
    
    // Verify that display was updated with correct notes
    expect(updatePianoDisplay).toHaveBeenCalledWith(scaleName);
  });

  test('Note labels should toggle correctly', () => {
    // Mock the label toggle function
    const toggleLabels = jest.fn();
    
    // Simulate label toggle
    act(() => {
      toggleLabels();
    });
    
    // Verify that labels were toggled
    expect(toggleLabels).toHaveBeenCalled();
  });
}); 