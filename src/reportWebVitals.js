// Function that registers a performance-entry callback to collect Web Vitals
const reportWebVitals = onPerfEntry => {
  // Proceed only if a valid callback function was provided by the caller
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library to avoid bloating the initial bundle
    import('web-vitals').then(
      // Destructure individual measurement functions when the module is loaded
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Cumulative Layout Shift: reports layout stability
        getCLS(onPerfEntry);
        // First Input Delay: measures input responsiveness
        getFID(onPerfEntry);
        // First Contentful Paint: time to first content rendering
        getFCP(onPerfEntry);
        // Largest Contentful Paint: time to largest element rendering
        getLCP(onPerfEntry);
        // Time To First Byte: server response start time
        getTTFB(onPerfEntry);
      }
    );
  }
};

// Export the reporter as the default export for use elsewhere in the app
export default reportWebVitals;