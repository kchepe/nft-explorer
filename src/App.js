import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import Appbar from "./Components/Appbar";
import CardComponent from "./Components/CardCardComponent";
import Pagination from "@mui/material/Pagination";

const App = () => {
  const [avaxApes, setAvaxApes] = useState([]);
  const [error, setError] = useState({ display: false, errorMessage: "" });
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const handleFetchData = async () => {
    let apes = [];
    for (var i = 0; i <= 50; i++) {
      const response = await fetch(
        `https://qjgw0y2t09.execute-api.us-east-1.amazonaws.com/metadata?index=${i}`
      );
      const data = await response.json();
      apes.push(data);
    }
    return apes;
  };
  useEffect(() => {
    setIsLoading(true);
    const handleApes = async () => {
      const apes = await handleFetchData();
      setIsLoading(false);
      setAvaxApes(apes);
      setError({ display: false, errorMessage: "" });
    };
    handleApes().catch(() => {
      setError({ display: true, errorMessage: "Unable to fetch Data" });
    });
  }, []);

  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
  };

  if (error.display)
    return (
      <div className="loading">
        <Typography variant="h5">{error.errorMessage}</Typography>
      </div>
    );

  return (
    <div>
      <Appbar />
      <Container maxWidth="xl" className="container">
        {isLoading ? (
          <div className="loading">
            <Typography variant="h5">Loading..</Typography>
          </div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} container justifyContent="flex-end">
              <Pagination
                count={Math.ceil(avaxApes.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
              />
            </Grid>
            {avaxApes
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((ape, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CardComponent ape={ape} />
                </Grid>
              ))}
            <Grid item xs={12} container justifyContent="flex-end">
              <Pagination
                count={Math.ceil(avaxApes.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default App;
