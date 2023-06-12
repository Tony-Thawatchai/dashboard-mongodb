import React, { useState } from "react";
import { useGetProductsQuery } from "../../state/api";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
    // {console.log("🚀 ~ file: index.jsx:84 ~ stat:", stat.forEach(element => {element.yearlySalesTotal}))}
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
          }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          sx={{
            mb: "1.5rem",
          }}
          color={theme.palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly></Rating>
        <Typography variant="body2"> {description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See more...
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
            
          <Typography>id: {_id}</Typography>
          <Typography>Supply left: {supply}</Typography>
          <Typography>Annual sales: {stat.yearlySalesTotal}</Typography>
          {/* <Typography>Annual sales: {stat[0].yearlySalesTotal}</Typography> */}
          
          <Typography>Annual unit sold: {stat.yearlyTotalSoldUnits}</Typography>
          {/* <Typography>Annual unit sold: {stat[0].yearlyTotalSoldUnits}</Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

function Products() {
  const { data, isLoading } = useGetProductsQuery();
  //   const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log("🚀 ~ file: index.jsx:19 ~ Products ~ data:", data);

  return (
    <Box>
      <Header title="PRODUCTS" subtitle="Manage your products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({_id, name, description, price, rating, category, supply, stat}) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
                
              />
            )
          )}
        </Box>
        
      ) : (
        "Loading..."
      )}
    </Box>
  );
}

export default Products;
