/* eslint-disable no-unused-vars */
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BookingPage() {

  const { bookingHistory } = useSelector(store => store.user)

  console.log(bookingHistory)

  return (
    <div className='w-full mt-20'>
      <h1 className='text-center  bg-rose-600 text-white text-4xl font-bold py-3'>Booking Overview</h1>
      <div className="flex justify-center">
        <div className='w-11/12 mt-5'>
          <div className='my-2'>
            <span className='border-2 border-rose-600 px-4 py-1 text-base  font-semibold '> New Booking</span>
            <div className=' w-1/2 flex justify-end my-5'>
              <div className='w-2/3 '>
                <div className=''>
                  <span className='text-sm   font-semibold text-rose-600'>Customer Name:</span> <span className='text-black text-sm'>prince</span>
                </div>
                <div className=''>
                  <span className='text-sm   font-semibold text-rose-600'> Phone No.:</span> <span>8989898989</span>
                </div>
                <div className=''>
                  <span className='text-sm   font-semibold text-rose-600'>  Serive Name:</span> <span> Hair cuts</span>
                </div>
                <div className=''>
                  <span className='text-sm   font-semibold text-rose-600'>   Price:</span> <span>&#8377; 900</span>
                </div>
                <div className=''>
                  <span className='text-sm   font-semibold text-rose-600'>   payment Method:</span> <span>online</span>

                </div>
                <div className=''>
                  <span className='text-sm   font-semibold text-rose-600'>   payment status:</span> <span>Paid</span>
                </div>
                <div className=' flex justify-end mt-5'>
                  <div className='w-2/3 flex justify-around'>
                    <button className='bg-green-600 px-4 py-1 rounded text-white   font-bold'>
                      Accept
                    </button>
                    <button className='bg-red-500 px-4 py-1 rounded text-white   font-bold'>
                      Reject
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className='my-5'>
            <span className='border-2 border-rose-600 px-4 py-1 text-base  font-semibold '> Today Booking</span>
            <div className='  flex justify-end my-5'>
              <div className='w-10/12  bg-rose-500'>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell ><span className=' font-bold '>Name</span></TableCell>
                        <TableCell  ><span className=' font-bold '>Service</span></TableCell>
                        <TableCell ><span className=' font-bold '>Price</span></TableCell>
                        <TableCell ><span className=' font-bold '>Payment Method</span></TableCell>
                        <TableCell ><span className=' font-bold '>Action</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.calories}</TableCell>
                          <TableCell>{row.fat}</TableCell>
                          <TableCell>{row.carbs}</TableCell>
                          <TableCell>{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>


          <div className='my-5'>
            <span className='border-2 border-rose-600 px-4 py-1 text-base  font-semibold '>Old History</span>
            <div className='  flex justify-end my-5'>
              <div className='w-10/12  bg-rose-500'>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell ><span className=' font-bold '>Name</span></TableCell>
                        <TableCell  ><span className=' font-bold '>Service</span></TableCell>
                        <TableCell ><span className=' font-bold '>Price</span></TableCell>
                        <TableCell ><span className=' font-bold '>Payment Method</span></TableCell>
                        <TableCell ><span className=' font-bold '>Action</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.calories}</TableCell>
                          <TableCell>{row.fat}</TableCell>
                          <TableCell>{row.carbs}</TableCell>
                          <TableCell>{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
