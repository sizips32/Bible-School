import React from 'react'
import { Button } from '@/components/ui/button.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              문제가 발생했습니다
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.
            </p>
            <div className="space-y-3">
              <Button
                onClick={this.handleReset}
                className="w-full"
              >
                다시 시도
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                페이지 새로고침
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
