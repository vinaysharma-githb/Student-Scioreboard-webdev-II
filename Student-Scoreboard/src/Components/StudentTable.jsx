import { useState } from 'react';

function StudentTable({ students, onUpdate }) {
  const [editScores, setEditScores] = useState({});
  const [savingId, setSavingId] = useState(null);

  const handleScoreChange = (id, val) => {
    setEditScores((prev) => ({ ...prev, [id]: val }));
  };

  const handleSave = (id) => {
    const raw = editScores[id];
    if (raw === undefined || raw === '') return;
    const s = parseInt(raw);
    if (isNaN(s) || s < 0 || s > 100) return;
    setSavingId(id);
    setTimeout(() => {
      onUpdate(id, s);
      setEditScores((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setSavingId(null);
    }, 350);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') handleSave(id);
  };

  return (
    <div className="student-table">
      <div className="student-table__header">
        <span className="student-table__title">STUDENT RECORDS</span>
        <span className="student-table__count">{students.length} {students.length === 1 ? 'entry' : 'entries'}</span>
      </div>

      <div className="student-table__cols">
        <span>NAME</span>
        <span>SCORE</span>
        <span>STATUS</span>
        <span>UPDATE</span>
      </div>

      <div className="student-table__body">
        {students.length === 0 && (
          <div className="student-table__empty">
            <span>// NO RECORDS FOUND</span>
          </div>
        )}

        {students.map((student, idx) => {
          const pass = student.score >= 40;
          const editVal = editScores[student.id];
          const isDirty = editVal !== undefined && editVal !== '';
          const isSaving = savingId === student.id;

          return (
            <div
              key={student.id}
              className={`student-row ${isSaving ? 'student-row--saving' : ''}`}
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              <span className="student-row__name">{student.name}</span>

              <span className={`student-row__score ${pass ? 'student-row__score--pass' : 'student-row__score--fail'}`}>
                {student.score}
              </span>

              <span className={`student-row__badge ${pass ? 'student-row__badge--pass' : 'student-row__badge--fail'}`}>
                <span className="student-row__badge-dot" />
                {pass ? 'PASS' : 'FAIL'}
              </span>

              <div className="student-row__update">
                <input
                  className={`student-row__input ${isDirty ? 'student-row__input--dirty' : ''}`}
                  type="number"
                  value={editVal !== undefined ? editVal : student.score}
                  onChange={(e) => handleScoreChange(student.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, student.id)}
                  min={0}
                  max={100}
                />
                <button
                  className={`student-row__save-btn ${isDirty ? 'student-row__save-btn--active' : ''}`}
                  onClick={() => handleSave(student.id)}
                  disabled={!isDirty || isSaving}
                >
                  {isSaving ? '...' : 'SAVE'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentTable;
