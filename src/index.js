import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import './styles/styles.css';

// Tracking functions
const trackSelection = (type, name) => {
    if (window.plausible) {
        window.plausible('Pattern Selected', {
            props: {
                type: type,
                name: name,
                category: `${type}_selection`
            }
        });
    }
};

const trackShowPattern = (type, name) => {
    if (window.plausible) {
        window.plausible('Show Pattern', {
            props: {
                type: type,
                name: name,
                action: 'show_pattern'
            }
        });
    }
};

const trackPlay = (type, name) => {
    if (window.plausible) {
        window.plausible('Play Pattern', {
            props: {
                type: type,
                name: name,
                action: 'play_pattern'
            }
        });
    }
};

const trackKeyPress = (noteName) => {
    if (window.plausible) {
        window.plausible('Key Pressed', {
            props: {
                note: noteName,
                action: 'key_press'
            }
        });
    }
};

const trackModeSwitch = (newMode) => {
    if (window.plausible) {
        window.plausible('Mode Switch', {
            props: {
                mode: newMode,
                action: 'mode_change'
            }
        });
    }
};

// Note definitions - one octave starting from C
const NOTES = [
    { name: 'C', type: 'white', id: 0, sharp: 'C', flat: 'C' },
    { name: 'C#', type: 'black', id: 1, sharp: 'C#', flat: 'Db' },
    { name: 'D', type: 'white', id: 2, sharp: 'D', flat: 'D' },
    { name: 'D#', type: 'black', id: 3, sharp: 'D#', flat: 'Eb' },
    { name: 'E', type: 'white', id: 4, sharp: 'E', flat: 'E' },
    { name: 'F', type: 'white', id: 5, sharp: 'F', flat: 'F' },
    { name: 'F#', type: 'black', id: 6, sharp: 'F#', flat: 'Gb' },
    { name: 'G', type: 'white', id: 7, sharp: 'G', flat: 'G' },
    { name: 'G#', type: 'black', id: 8, sharp: 'G#', flat: 'Ab' },
    { name: 'A', type: 'white', id: 9, sharp: 'A', flat: 'A' },
    { name: 'A#', type: 'black', id: 10, sharp: 'A#', flat: 'Bb' },
    { name: 'B', type: 'white', id: 11, sharp: 'B', flat: 'B' }
];

// Scales and chords (copied from src/constants/musicalData.js)
const SCALES = {
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

const CHORDS = {
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

const getAccidentalType = (name) => name.includes('#') ? 'sharp' : (name.includes('♭') || name.includes('b')) ? 'flat' : 'sharp';

function PianoKey({ note, isActive, isHighlighted, onClick, showLabel, accidentalType }) {
    const handleClick = () => onClick(note.id);
    return (
        <div
            className={`piano-key ${note.type}-key ${isActive ? 'active' : ''} ${isHighlighted ? 'highlighted' : ''}`}
            onClick={handleClick}
            onMouseDown={e => e.preventDefault()}
        >
            {showLabel && note[accidentalType]}
        </div>
    );
}

function Piano({ activeNotes, highlightedNotes, onKeyPress, showLabels, accidentalType }) {
    return (
        <div className="piano-container">
            {NOTES.map(note => (
                <PianoKey
                    key={note.id}
                    note={note}
                    isActive={activeNotes.includes(note.id)}
                    isHighlighted={highlightedNotes.includes(note.id)}
                    onClick={onKeyPress}
                    showLabel={showLabels}
                    accidentalType={accidentalType}
                />
            ))}
        </div>
    );
}

function PianoApp() {
    const [activeNotes, setActiveNotes] = useState([]);
    const [highlightedNotes, setHighlightedNotes] = useState([]);
    const [currentMode, setCurrentMode] = useState('scales');
    const [selectedItem, setSelectedItem] = useState('C Major');
    const [showNoteNames, setShowNoteNames] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const accidentalType = getAccidentalType(selectedItem);

    useEffect(() => {
        let modeStartTime = Date.now();
        let isVisible = !document.hidden;
        const handleVisibilityChange = () => {
            const now = Date.now();
            if (document.hidden && isVisible) {
                isVisible = false;
            } else if (!document.hidden && !isVisible) {
                modeStartTime = now;
                isVisible = true;
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [currentMode]);

    const getCurrentNotes = () => {
        const intervals = currentMode === 'scales' ? SCALES[selectedItem] : CHORDS[selectedItem];
        return intervals || [];
    };
    const handleKeyPress = (noteId) => {
        setActiveNotes([noteId]);
        setTimeout(() => setActiveNotes([]), 150);
        trackKeyPress(NOTES[noteId].name);
    };
    const playSequence = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        const notes = getCurrentNotes();
        setHighlightedNotes([]);
        if (currentMode === 'scales') {
            notes.forEach((note, index) => {
                setTimeout(() => {
                    setActiveNotes([note]);
                    if (index === notes.length - 1) {
                        setTimeout(() => {
                            setActiveNotes([]);
                            setIsPlaying(false);
                        }, 400);
                    }
                }, index * 400);
            });
        } else {
            setActiveNotes(notes);
            setTimeout(() => {
                setActiveNotes([]);
                setIsPlaying(false);
            }, 1500);
        }
        trackPlay(currentMode, selectedItem);
    };
    const showPattern = () => {
        const notes = getCurrentNotes();
        setHighlightedNotes(notes);
        setActiveNotes([]);
        trackSelection(currentMode, selectedItem);
    };
    const clearPattern = () => {
        setHighlightedNotes([]);
        setActiveNotes([]);
    };
    const getNoteNames = () => {
        const notes = getCurrentNotes();
        return notes.map(noteId => NOTES[noteId][accidentalType]);
    };
    return (
        <div className="min-h-screen p-4" style={{backgroundColor: '#1a202c'}}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-primary">🎹 Patrick's Piano Scales & Chords</h1>
                    <p className="text-secondary">Learn and practice piano patterns</p>
                </div>
                <div className="flex justify-center mb-6">
                    <div className="rounded-lg p-1 flex" style={{backgroundColor: '#1f2937', border: '1px solid #2d5c4b'}}>
                        <button onClick={() => { setCurrentMode('scales'); setSelectedItem('C Major'); clearPattern(); trackModeSwitch('scales'); }} className="px-6 py-2 rounded-md" style={{backgroundColor: currentMode === 'scales' ? '#e4d59b' : 'transparent', color: currentMode === 'scales' ? '#1a202c' : '#f9fafb', fontWeight: currentMode === 'scales' ? '600' : '500', transition: 'all 0.2s ease'}}>Scales</button>
                        <button onClick={() => { setCurrentMode('chords'); setSelectedItem('C Major'); clearPattern(); trackModeSwitch('chords'); }} className="px-6 py-2 rounded-md" style={{backgroundColor: currentMode === 'chords' ? '#e4d59b' : 'transparent', color: currentMode === 'chords' ? '#1a202c' : '#f9fafb', fontWeight: currentMode === 'chords' ? '600' : '500', transition: 'all 0.2s ease'}}>Chords</button>
                    </div>
                </div>
                <div className="flex justify-center mb-6">
                    <select value={selectedItem} onChange={e => { setSelectedItem(e.target.value); clearPattern(); trackModeSwitch(e.target.value); }} className="px-4 py-2 rounded-lg border focus:outline-none" style={{backgroundColor: 'rgb(4, 98, 75)', color: '#ffffff', borderColor: '#7d9b8e', fontWeight: '500'}}>
                        {Object.keys(currentMode === 'scales' ? SCALES : CHORDS).map(item => (
                            <option key={item} value={item} style={{backgroundColor: 'rgb(4, 98, 75)', color: '#ffffff'}}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    <button onClick={showPattern} className="px-6 py-2 rounded-lg font-semibold btn-show-pattern">Show Pattern</button>
                    <button onClick={playSequence} disabled={isPlaying} className="px-6 py-2 rounded-lg font-semibold btn-play">{isPlaying ? 'Playing...' : 'Play'}</button>
                    <button onClick={clearPattern} className="px-6 py-2 rounded-lg font-semibold btn-clear">Clear</button>
                </div>
                <div className="flex justify-center mb-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={showNoteNames} onChange={e => setShowNoteNames(e.target.checked)} className="w-4 h-4 rounded focus:ring-2" style={{accentColor: '#7d9b8e'}} />
                        <span className="text-secondary">Show note names</span>
                    </label>
                </div>
                <Piano activeNotes={activeNotes} highlightedNotes={highlightedNotes} onKeyPress={handleKeyPress} showLabels={showNoteNames} accidentalType={accidentalType} />
                <div className="card-bg rounded-lg p-6 text-center mt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">{selectedItem} {currentMode === 'scales' ? 'Scale' : 'Chord'}</h3>
                    <p className="text-secondary mb-4 font-medium">Notes: {getNoteNames().join(' - ')}</p>
                    <p className="text-sm text-muted">{currentMode === 'scales' ? 'Click "Show Pattern" to see the scale notes, or "Play" to see them in sequence' : 'Click "Show Pattern" to see the chord notes, or "Play" to see them together'}</p>
                </div>
                <div className="card-bg mt-8 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-3 text-primary">How to Use:</h3>
                    <ul className="text-secondary space-y-2 text-sm font-medium">
                        <li>• Switch between Scales and Chords using the toggle buttons</li>
                        <li>• Select different scales/chords from the dropdown menu</li>
                        <li>• Click "Show Pattern" to highlight the notes on the piano</li>
                        <li>• Click "Play" to see the pattern animated</li>
                        <li>• Click individual piano keys to play them</li>
                        <li>• Toggle note names on/off to test your knowledge</li>
                        <li> Made with ❤️ by <a href="https://patrickmccanna.net">Patrick McCanna </a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<PianoApp />); 