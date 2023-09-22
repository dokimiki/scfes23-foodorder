"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  reception_time: string,
  quant: number,
  completion_time: number,
) {
  return { 
    reception_time, quant,completion_time, };
}

const rows = [
  createData('11:20', 159,6.0),
];

function  content(){
    
}

export default function Potato() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 700,margin: "50px auto 0 auto",}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>受付時間 </TableCell>
            <TableCell align="left">本数</TableCell>
            <TableCell align="left">完成時間</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.reception_time}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reception_time}
              </TableCell>
              <TableCell align="left">{row.quant}</TableCell>
              <TableCell align="left">{row.completion_time}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
