import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Fuse from "fuse.js";
import { BACKEND_BASE_URL } from "../api";

const URL = BACKEND_BASE_URL;
// const URL = "https://d059-2401-4900-1c6e-a495-c1d6-524e-7897-aa6c.ngrok-free.app"

const MainModule = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [warningMessageToShow, setWarningMessageToShow] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [allSearchResults, setAllSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);

  const fuse = new Fuse(allSearchResults, {
    keys: ["name"],
    threshold: 0.5,
  });

  const handleSearchByBrandName = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults(allSearchResults);
    } else {
      let a = fuse.search(e.target.value);
      let arr = [];
      a.map((result) => {
        arr.push(result.item);
      });
      setSearchResults(arr);
      if(arr.length == 0){
        setNoDataFound(true);
        setQuery("");
        setTimeout(() => {
            setNoDataFound(false); 
        }, 1500);
      }
    }
    // console.log(fuse.search(e.target.value));
  };

  const handleSearch = () => {
    if (minPrice.trim() === "" || maxPrice.trim() === "") {
      setShowWarningMessage(true);
      setWarningMessageToShow("Please enter min/max price.");
      setTimeout(() => {
        setShowWarningMessage(false);
      }, 1500);
      return;
    } else if (minPrice <= 0 || maxPrice <= 0) {
      setShowWarningMessage(true);
      setWarningMessageToShow("Min/Max price can't be less than or equal to 0");
      setTimeout(() => {
        setShowWarningMessage(false);
      }, 1500);
      return;
    } else {
      setShowLoader(true);
      fetch(`${URL}/find-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minPrice: parseInt(minPrice),
          maxPrice: parseInt(maxPrice),
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error occured!!");
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          if (data.status === "success" && data.data.length > 0) {
            setAllSearchResults(data.data);
            setSearchResults(data.data);
          } else{
            setNoDataFound(true);
            setTimeout(() => {
                setNoDataFound(false);
            }, 1500);
          }
          setShowLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div id="main-module">
      <div className="flex justify-center m-auto mt-10">
        <h2 className="md:text-3xl text-3xl md:leading-10 font-extrabold text-[#333] mb-4">
          Find Your Next Phone
        </h2>
      </div>

      <div className="lg:flex lg:justify-center m-auto mt-10 lg:gap-8 gap-5 grid justify-items-center">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Min Price ($)"
            type="number"
            variant="standard"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Max Price ($)"
            type="number"
            variant="standard"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
          />
        </Box>
      </div>

      <div className="flex justify-center m-auto mt-2 gap-5">
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        {allSearchResults.length > 0 ? (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setAllSearchResults([]);
                setSearchResults([]);
                setMaxPrice("");
                setMinPrice("");
                setQuery("")
              }}
            >
              Clear
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>

      {showWarningMessage ? (
        <div className="flex justify-center m-auto mt-5 px-40">
          <Alert variant="filled" severity="warning">
            {warningMessageToShow}
          </Alert>
        </div>
      ) : (
        <></>
      )}

      {showLoader ? (
        <div className="flex justify-center m-auto mt-5">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <>
              <div className="flex justify-center m-auto mt-10">
                <TextField
                  id="standard-basic"
                  label="Search by brand..."
                  variant="standard"
                  value={query}
                  onChange={handleSearchByBrandName}
                />
              </div>
              <div className="grid lg:grid-cols-4 lg:px-5 col-3 m-auto mt-20 gap-5 px-10">
                {searchResults.map((product, idx) => (
                  <>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                      key={idx}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200" // Set a fixed height for the images, adjust as needed
                          image={product.image}
                          alt={product.name.slice(0, 15)}
                          style={{ height: "220px", objectFit: "contain" }}
                        />
                        <CardContent>
                          {/* <Typography gutterBottom variant="h6" component="div"> */}
                          <span className="text-md font-semibold">
                            {product.name}
                          </span>
                          {/* </Typography> */}
                          <Typography variant="body2" color="text.secondary">
                            <span className="font-medium text-2xl ">
                              ${product.price}
                            </span>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          href={product.link}
                        >
                          Buy
                        </Button>
                      </CardActions>
                    </Card>
                  </>
                ))}
              </div>
            </>
          ) : (
            <>
              
            </>
          )}
        </>
      )}

      {noDataFound ? (
        <>
        <div className="flex justify-center m-auto mt-5 px-40">
          <Alert variant="filled" severity="error">
            No result found!!
          </Alert>
        </div>
        </>
      ) : <></>}
    </div>
  );
};

export default MainModule;
