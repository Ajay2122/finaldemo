/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";

import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";



const Pagination1 = ({ currentPage, totalPages, onPageChange }) => {
    
  
    return (
        <div
        style={{ display: "flex", marginTop: "3rem", justifyContent: "center",marginBottom:"3rem" }}
      >
       
        <Stack spacing={2} justifyContent="center">

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                  color: "black", // Set the default color for pagination numbers
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                    color: "white", // Set the color for the focused pagination number
                    fontWeight: "bold", // Optionally, apply other styles
                },
                paddingBottom:0
            }}
            />
            </Stack>
    
      </div>
    );
  };
  
  export default Pagination1;


