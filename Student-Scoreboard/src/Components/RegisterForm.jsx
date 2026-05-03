import { useState } from 'react';

function RegisterForm({ onAdd }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('NAME REQUIRED');
      setTimeout(() => setError(''), 1800);
      return;
    }
    const s = parseInt(score);
    if (isNaN(s) || s < 0 || s > 100) {
      setError('SCORE: 0–100');
      setTimeout(() => setError(''), 1800);
      return;
    }
    onAdd({ name: name.trim(), score: s });
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
    setName('');
    setScore('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className={`register-form ${flash ? 'register-form--flash' : ''}`}>
      <div className="register-form__header">
        <span className="register-form__indicator" />
        <span className="register-form__label">REGISTER STUDENT</span>
        {error && <span className="register-form__error">{error}</span>}
        <span className="register-form__sublabel">NEW ENTRY</span>
      </div>

      <div className="register-form__body">
        <input
          className="register-form__input register-form__input--name"
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={30}
        />
        <input
          className="register-form__input register-form__input--score"
          type="number"
          placeholder="Score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          onKeyDown={handleKeyDown}
          min={0}
          max={100}
        />
        <button
          className="register-form__btn"
          onClick={handleAdd}
        >
          + ADD
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
