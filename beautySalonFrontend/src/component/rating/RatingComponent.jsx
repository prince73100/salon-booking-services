/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function RatingComponent({ postrating, showrating, rating }) {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            {/* <Typography component="legend">Controlled</Typography> */}
            {!showrating && <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    postrating(newValue)
                }}
            />}
            {showrating && <Rating name="read-only" value={rating} readOnly />}
        </Box>
    );
}
