import * as React from 'react';

import { FaSearch } from 'react-icons/fa';

const SearchInput = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E7E7E7',
        borderRadius: '5px',
        padding: '5px 10px',
        maxWidth: '300px',
        backgroundColor: 'white',
      }}
    >
      <FaSearch style={{ marginRight: '10px', color: '#B3B3B3' }} />
      <input
        type="text"
        placeholder="Search"
        style={{
          border: 'none',
          outline: 'none',
          flex: '1',
          fontSize: '16px',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

export default SearchInput;
