import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email.trim() === '') {
      setError('Email is required.');
      setSuccess(false);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess(false);
      return;
    }

    setError('');
    setSuccess(true);
    setEmail('');
  }

  return (
    <section id="newsletter" className="section-p1 section-m1">
      <div className="newstext">
        <h4>Sign Up For Newsletters</h4>
        <p>
          Get E-mail updates about our latest shop and <span>special offers.</span>
        </p>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // clear feedback when the user starts typing again
              setError('');
              setSuccess(false);
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
        {error && (
          <p className="newsletter-error" role="alert" style={{ color: 'red', marginTop: '6px' }}>
            {error}
          </p>
        )}
        {success && (
          <p className="newsletter-success" role="status" style={{ color: 'green', marginTop: '6px' }}>
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
