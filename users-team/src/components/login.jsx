import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};
const errorMessage = {
  ad: "En az üç karakter giriniz",
  soyad: "En az üç karakter giriniz",
  email: "Geçerli bir email adresi giriniz",
  password:
    "Şifreniz en az bir büyük harf , küçük harf, rakam ve özel karakter içermelidir.",
};

export default function Login() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState(Math.floor(Math.random() * 10));

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name == "ad" || name == "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) return;
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      regex.test(formData.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardHeader>Register Form</CardHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="ad">Ad</Label>
            <Input
              id="ad"
              name="ad"
              placeholder="Lütfen isminizi giriniz"
              type="text"
              onChange={handleChange}
              value={formData.ad}
              invalid={errors.ad}
            />

            {errors.ad && <FormFeedback>{errorMessage.ad}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="soyad">Soyad</Label>
            <Input
              id="soyad"
              name="soyad"
              placeholder="Lütfen soyadınızı giriniz"
              type="soyad"
              onChange={handleChange}
              value={formData.soyad}
              invalid={errors.soyad}
            />
            {errors.soyad && <FormFeedback>{errorMessage.soyad}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Lütfen kurumsal email adresinizi giriniz"
              type="email"
              onChange={handleChange}
              value={formData.email}
              invalid={errors.email}
            />
            {errors.email && <FormFeedback>{errorMessage.email}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="password">Şifre</Label>
            <Input
              id="password"
              name="password"
              placeholder="Lütfen geçerli bir şifre giriniz"
              type="password"
              onChange={handleChange}
              value={formData.password}
              invalid={errors.password}
            />
            {errors.password && (
              <FormFeedback>{errorMessage.password}</FormFeedback>
            )}
          </FormGroup>

          <Button disabled={!isValid}>Submit</Button>
        </Form>
      </CardBody>
      <CardFooter>Id: {id} </CardFooter>
    </Card>
  );
}
