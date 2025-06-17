import React, { useState } from 'react';
import { useABTestContext } from '../context/ABTestProvider';

export interface ABTestDebuggerProps {
  /**
   * CSS class name for the component
   */
  className?: string;
  
  /**
   * Whether to show the debugger by default
   */
  defaultOpen?: boolean;
}

/**
 * ABTestDebugger component for debugging A/B tests
 * 
 * @example
 * ```tsx
 * <ABTestDebugger />
 * ```
 */
export function ABTestDebugger({
  className = '',
  defaultOpen = false,
}: ABTestDebuggerProps) {
  const { tests, assignments, debug, toggleDebug } = useABTestContext();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // If not in debug mode, show nothing or a minimal button
  if (!debug && !isOpen) {
    return (
      <button
        className={`ab-test-debugger-toggle ${className}`}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 9999,
          padding: '5px',
          background: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '3px',
          fontSize: '12px',
        }}
      >
        A/B Debug
      </button>
    );
  }
  
  // Get active tests
  const activeTests = tests.filter(test => test.active);
  
  return (
    <div
      className={`ab-test-debugger ${className}`}
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 9999,
        padding: '15px',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflow: 'auto',
        fontSize: '14px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ margin: '0', fontSize: '16px' }}>A/B Test Debugger</h3>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={debug}
            onChange={toggleDebug}
            style={{ marginRight: '5px' }}
          />
          Debug Mode {debug ? 'Enabled' : 'Disabled'}
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 5px', fontSize: '14px' }}>Active Tests ({activeTests.length})</h4>
        {activeTests.length === 0 ? (
          <p style={{ margin: '0', color: '#666' }}>No active tests</p>
        ) : (
          <ul style={{ margin: '0', padding: '0 0 0 20px' }}>
            {activeTests.map(test => {
              const assignment = assignments.find(a => a.testId === test.id);
              const variant = test.variants.find(v => v.id === assignment?.variantId);
              
              return (
                <li key={test.id} style={{ marginBottom: '5px' }}>
                  <strong>{test.name}</strong> ({test.id})
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Variant: {variant ? `${variant.name} (${variant.id})` : 'Not assigned'}
                  </div>
                  
                  {debug && (
                    <div style={{ marginTop: '5px' }}>
                      <select
                        value={assignment?.variantId || ''}
                        onChange={(e) => {
                          // Update URL with debug parameter
                          const url = new URL(window.location.href);
                          url.searchParams.set(`ab_${test.id}`, e.target.value);
                          window.location.href = url.toString();
                        }}
                        style={{ fontSize: '12px', padding: '2px' }}
                      >
                        <option value="">Select variant...</option>
                        {test.variants.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.id}) - {v.weight}%
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 5px', fontSize: '14px' }}>Assignments ({assignments.length})</h4>
        {assignments.length === 0 ? (
          <p style={{ margin: '0', color: '#666' }}>No assignments</p>
        ) : (
          <ul style={{ margin: '0', padding: '0 0 0 20px' }}>
            {assignments.map(assignment => (
              <li key={`${assignment.testId}-${assignment.variantId}`} style={{ fontSize: '12px' }}>
                <div>Test: {assignment.testId}</div>
                <div>Variant: {assignment.variantId}</div>
                <div>Assigned: {new Date(assignment.timestamp).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {debug && (
        <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <button
            onClick={() => {
              // Clear all debug parameters
              const url = new URL(window.location.href);
              activeTests.forEach(test => {
                url.searchParams.delete(`ab_${test.id}`);
              });
              window.location.href = url.toString();
            }}
            style={{
              padding: '5px 10px',
              fontSize: '12px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '3px',
              cursor: 'pointer',
              marginRight: '5px',
            }}
          >
            Clear Debug Params
          </button>
          
          <button
            onClick={() => {
              // Clear assignments and reload
              if (confirm('Clear all A/B test assignments? This will reload the page.')) {
                localStorage.removeItem('ab_test_assignments');
                document.cookie = 'ab_test_assignments=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                window.location.reload();
              }
            }}
            style={{
              padding: '5px 10px',
              fontSize: '12px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Reset Assignments
          </button>
        </div>
      )}
    </div>
  );
} 