import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../screens/Css Screens/editbooking.css";


import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EditBooking(props) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  });
  const { start_date, end_date } = formData;
  const { bookings, handleEdit, handleDelete } = props;
  const { id } = useParams();

  useEffect(() => {
    const prefillFormData = () => {
      const bookingItem = bookings.find((booking) => booking.id === Number(id));
      setFormData({
        start_date: bookingItem.start_date,
        end_date: bookingItem.end_date,
      });
    };
    if (bookings.length) {
      prefillFormData();
    }
  }, [bookings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(id, formData);
      }}
    >
      <TextField
        required
        className="edit-date-input"
        type="date"
        label="start_date"
        name="start_date"
        value={start_date}
        onChange={handleChange}
        variant="outlined"
      />

      <TextField
        required
        type="date"
        className="edit-date-input"
        label="end_date"
        name="end_date"
        value={end_date}
        onChange={handleChange}
        variant="outlined"
      />
      {/* <Link to="/register">Register</Link> */}
      <div className="edit-submit">
      <button>Submit</button>
      </div>
      <div className ="delete-button">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleDelete(id);
        }}
        >
        Delete Booking
      </button>
        </div>
    </form>
  );
}
