import React from 'react';
export const renewColumn = ({ header }) => {
  let listHeader = [];
  header &&
    header.map(h => {
      let withIcon = h.Header;
      h.Header = withIcon;
      listHeader = [...listHeader, h];
    });
  return listHeader;
};
