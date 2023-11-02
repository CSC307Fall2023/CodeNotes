'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';

import "../styles/global.css"

const folderBarStyle = {
  backgroundColor: '#D9D9D9',
  height: '100vh', // 100% of the viewport height
  width: '35vh'
};

const contentContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const headerStyle = {
  height: '150px',
  padding: '0 20px'
};

const classNotebookLabelStyle = {
  fontFamily: 'Inter-SemiBold, Helvetica',
  fontSize: '20px',
  color: '#050505',
  margin: '0',
  marginTop: '40px'
};

const noteLabelStyle = {
  fontFamily: 'Inter-SemiBold, Helvetica',
  fontSize: '40px',
  color: '#050505',
  margin: '0'
};

const toolBoxStyle = {
  backgroundColor: '#D9D9D9',
  height: '68px',
  width: '100vh'
};

export default function Note() {
  return (
    <div style={{ display: 'flex' }}>
      <Box sx={folderBarStyle}></Box>
      <div style={contentContainerStyle}>
        <div style={headerStyle}>
          <h2 style={classNotebookLabelStyle}>CSC 307</h2>
          <h1 style={noteLabelStyle}>HTML and JS Introduction</h1>
        </div>
        <Box sx={toolBoxStyle}></Box>
      </div>
    </div>
  );
}