import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";


import fetchData from '../../core/Data/HTTPFetch'

import { filterByColumnMapping, generateColumnConfiguration } from '../../core/Table/XDataGrid'
import StatBox from "../../components/StatBox";

import EmailIcon from "@mui/icons-material/Email";

const Current = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let data          = fetchData("https://api.covid19api.com/summary", "general")  
  let countryData   = filterByColumnMapping(data.Countries, {
    'Country'           : 'Country', 
    "NewConfirmed"      : 'NewConfirmed',  
    "TotalConfirmed"    : "Total Confirmed", 
    "NewDeaths"         : "New Deaths",
    "TotalDeaths"       : "Total Deaths"
    });


    const globalData = data.Global;

  const columns     = generateColumnConfiguration(countryData);

  const setValue = "12,361";

  return (
    <Box m="20px">
      <Header title="Global Current Metrics" subtitle="Per Country Distribution" />
      <Box
          gridColumn="span 1"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="20px"
        >
          <StatBox
            title={globalData.NewConfirmed.toLocaleString("en-US")}
            subtitle="New Confirmed"
          />

          <StatBox
            title={globalData.NewDeaths.toLocaleString("en-US")}
            subtitle="New Deaths"
          />

          <StatBox
            title={globalData.TotalConfirmed.toLocaleString("en-US")}
            subtitle="Total Confirmed"
          />

        </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={countryData} columns={columns}        
            getRowId={(row) => row.Country}
        />
      </Box>
    </Box>
  );
};

export default Current;
