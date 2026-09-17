import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, message: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "white", padding: "40px", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p style={{ color: "#9aa5b1", marginTop: "10px" }}>{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
