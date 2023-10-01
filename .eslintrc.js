module.exports = {
  // Other ESLint configuration options

  plugins: ['react-hooks'], // Add the 'react-hooks' plugin

  // Extend or override rules
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn', // Set it to 'warn' to show a warning instead of an error
      {
        // List the dependencies that you want to ignore
        additionalHooks: 'useMemo, useCallback, dispatch, navigate', // Add the hooks you want to ignore
      },
    ],
  },
};
