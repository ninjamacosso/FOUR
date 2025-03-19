import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div className="error-boundary">
          <h1>Algo deu errado.</h1>
          <p>Ocorreu um erro inesperado ao carregar a página.</p>
          <button onClick={() => window.location.reload()}>
            Recarregar a Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 