// components/ErrorComponent.tsx (Client Component)
'use client';

import { useSearchParams } from 'next/navigation';

const ErrorComponent = () => {
  const searchParams = useSearchParams();

  const error = searchParams.get('error');
  
  return (
    <div>
      {error ? (
        <p>Error occurred: {error}</p>
      ) : (
        <p>No error found in the URL parameters.</p>
      )}
    </div>
  );
};

export default ErrorComponent;
