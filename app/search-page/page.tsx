import React, { Suspense } from 'react';
import TestComp from './components/test';

const SearchPage = () => {
  console.log('in Search Page');
  return (
    <>
      <div>SearchPage</div>
      <Suspense fallback="loading...">
        <TestComp />
      </Suspense>
    </>
  );
};

export default SearchPage;
