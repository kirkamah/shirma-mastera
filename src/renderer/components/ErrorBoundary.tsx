import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  name?: string
}
interface State {
  hasError: boolean
  message?: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[${this.props.name ?? 'section'}]`, error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-parchment/80">
          <div className="text-5xl">⚠️</div>
          <h2 className="font-serif text-2xl text-accent">Что-то пошло не так</h2>
          <p className="max-w-md text-sm text-parchment/60">{this.state.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, message: undefined })}
            className="mt-2 rounded border border-accent/50 px-4 py-2 text-sm hover:bg-accent/20"
          >
            Повторить
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
