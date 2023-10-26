import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleCancel = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '20px' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error.toString()}</p>
          <button onClick={this.handleRefresh}>Refresh</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
