import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed inset-0 bg-[#008080] flex items-center justify-center p-6">
          <div className="bevel hard-shadow max-w-md w-full">
            <div className="titlebar px-2 py-1.5 font-vt text-[16px]">YUG.EXE — UNEXPECTED HALT</div>
            <div className="bg-[#ece8dc] p-5">
              <p className="font-vt text-[18px] text-[#1a1a1a] mb-2">A component crashed, not the story.</p>
              <p className="text-[13px] text-[#555] mb-4">Reload to reboot the machine. The memory is non-volatile.</p>
              <button onClick={() => window.location.reload()} className="bevel-btn font-vt text-[16px] px-4 py-2">
                REBOOT YUG.EXE
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
