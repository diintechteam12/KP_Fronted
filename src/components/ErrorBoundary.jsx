import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', background: '#fff3f3', color: '#d32f2f', margin: '1rem', borderRadius: '8px', border: '1px solid #f5c2c7' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Section temporarily unavailable.</h3>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>We are working on bringing this back up.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}
