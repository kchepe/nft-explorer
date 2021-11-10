import { CardMedia, Card, CardContent, Grid } from "@mui/material";
import React from "react";

const CardComponent = (props) => {
  const { ape } = props;
  console.log(ape);
  return (
    <>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" image={ape.image} />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h3 style={{ color: "#1976d2" }}>{ape.name}</h3>
            </Grid>
            {ape.attributes.map((attrib, index) => (
              <Grid
                item
                xs={12}
                key={index}
                container
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={3}>
                  <b>{attrib.trait_type}:</b>
                </Grid>
                <Grid item xs={9}>
                  {attrib.value}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CardComponent;
