import React, { useState } from 'react';
export const renewColumn = ({ header, icon }) => {
  let listHeader = [];
  header &&
    header.map((h, index) => {
      console.log(h);
      let withIcon = h.Header;
      h.Header = withIcon;
      listHeader = [...listHeader, h];
    });
  return listHeader;
};
