import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { updateBooking } from "../helper/redux/Reducer/bookings.reducer";

const BookingPage = () => {
  const [Razorpay] = useRazorpay();
  const [loading, setLoading] = useState(false);
  const navTo = useNavigate();

  const dispatch = useDispatch();

  const { booking_date, booking_time } = JSON.parse(
    localStorage["slot-booking-data"]
  );
  let time = "";
  let originalTime = "";
  switch (booking_time) {
    case 3: {
      time = "three";
      originalTime = "03.00pm";
      break;
    }
    case 6: {
      time = "six";
      originalTime = "06.00pm";
      break;
    }
    case 9: {
      time = "nine";
      originalTime = "09.00am";
      break;
    }
    default: {
      time = "twelve";
      originalTime = "12.00pm";
      break;
    }
  }

  const fieldValidationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    number: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
      date: booking_date,
      time: time,
      payment_id: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (bookingInfo) => {
      try {
        setLoading(true);
        handlePayment(bookingInfo);
      } catch (error) {
        setLoading(false);
        toast.error("Try again later");
      }
    },
  });

  const handlePayment = async (bookingInfo) => {
    const options = {
      key: "rzp_test_F66suPajOfS7iH",
      key_secret: "JmcYo3OnGe6CH042zqKslWET",
      amount: 100000,
      currency: "INR",
      name: "Slot Booking",
      description: "Test Transaction",
      handler: async (res) => {
        try {
          bookingInfo.payment_id = res.razorpay_payment_id;
          await axios
            .post(
              "https://slot-booking-backend.vercel.app/booking",
              bookingInfo
            )
            .then((res) => {
              dispatch(
                updateBooking({ time: booking_time, date: booking_date })
              );
              toast.success("Slot Booked!");
              setLoading(false);
              navTo("/");
            })
            .catch((error) => {
              toast.error("Try agan later");
              setLoading(false);
            });
        } catch (error) {
          toast.error("Try again later");
          setLoading(false);
        }
      },
      prefill: {
        name: bookingInfo.name,
        email: bookingInfo.email,
        contact: bookingInfo.number,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  return (
    <Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
        <Stack
          textAlign={"center"}
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={6}
          px={6}
          rounded={"lg"}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Book slot
              </Heading>
            </Stack>
            <Stack spacing={4}>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input type="text" id="date" value={values.date} disabled />
              </FormControl>
              <FormControl id="time">
                <FormLabel>Time</FormLabel>
                <Input type="text" id="time" value={originalTime} disabled />
              </FormControl>
              <FormControl id="name" isRequired>
                <FormControl id="price">
                  <FormLabel>price</FormLabel>
                  <Input type="price" id="price" value={"₹ 1000"} disabled />
                </FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  id="name"
                  onChange={handleChange}
                  bg={errors.name ? "red.100" : ""}
                  placeholder={errors.name ? "required" : ""}
                  value={values.name}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  bg={errors.email ? "red.100" : ""}
                  placeholder={errors.email ? "required" : ""}
                  value={values.email}
                />
              </FormControl>
              <FormControl id="number" isRequired>
                <FormLabel>number</FormLabel>
                <Input
                  type="number"
                  id="number"
                  onChange={handleChange}
                  bg={errors.number ? "red.100" : ""}
                  placeholder={errors.number ? "required" : ""}
                  value={values.number}
                />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  onClick={handleSubmit}
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Book Now
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Button className={"btn btn-warning"} onClick={() => navTo("/")}>
            click to homepage
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default BookingPage;
