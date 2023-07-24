import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Grid } from "@mui/material";
// hooks
import Slider from "react-slick";
// import useResponsive from "../hooks/useResponsive";
// sections
// import { APP_NAME } from "src/app/constants";
import { useState } from "react";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import LoginForm from "../sections/auth/login/LoginForm";

const APP_NAME = "Cloud-storage"
// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
//   const mdUp = useResponsive("up", "md");
  const [loading, setloading] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    fade: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Helmet>
        <title> Login | {APP_NAME} </title>
      </Helmet>
      <Container fixed>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {true && (
            <Grid item xs={5}>
              <Slider {...settings}>
                <div>
                  {" "}
                  <img
                    src="https://i.pcmag.com/imagery/reviews/065LBaNWT3jlc8HjQsR6vXE-19.fit_lpad.size_625x365.v1569479905.png"
                    alt="slide"
                    className="w-100"
                  />
                </div>

              </Slider>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <StyledContent>

              <Typography variant="h4" mt={3} mb={2}>
                Login details
              </Typography>

              <LoginForm setloading={setloading} />
            </StyledContent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
