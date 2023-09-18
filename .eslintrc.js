export const rules = {
  'react-hooks/exhaustive-deps': [
    'warn',
    {
      // List the dependencies that you want to ignore
      additionalHooks: 'useMemo, useCallback, dispatch, navigate', // Add the hooks you want to ignore
    },
  ],
};
