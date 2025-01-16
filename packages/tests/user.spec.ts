import { describe, expect, test, it } from 'vitest'
import { axios } from "./axios";

const BACKEND_URL = "http://localhost:8080"

const PHONE_NUMBER_1 = "7060334001";
const NAME_1 = "harkirat";

describe("Signup endpoints", () => {

  it('Double user signup doesnt work', async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      number: PHONE_NUMBER_1,
    });

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
      number: PHONE_NUMBER_1,
      name: NAME_1,
      otp: "000000"
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.data.id).not.toBeNull();
<<<<<<< HEAD

    expect(async () => {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        number: PHONE_NUMBER_1,
      });
    }).toThrow();

    });
  
  });

  it('Admin signin works', async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
      phoneNumber: PHONE_NUMBER_1,
    });

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/admin/signin/verify`, {
      phoneNumber: PHONE_NUMBER_1,
=======
  })

})

describe("Signin endpoints", () => {

  it('Signin works as expected', async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      number: PHONE_NUMBER_1,
    });

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signin/verify`, {
      number: PHONE_NUMBER_1,
      name: NAME_1,
>>>>>>> 4835732643a8d6184db29177f6e55afe18219b1d
      otp: "000000"
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.data.id).not.toBeNull();
<<<<<<< HEAD

    expect(async () => {
      await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
        phoneNumber: PHONE_NUMBER_1,
      });
    }).toThrow();



  })
=======
    expect(response2.data.token).not.toBeNull();
  })

  it('Signin doesnt work for user who doesnt exist in db', async () => {

    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      number: PHONE_NUMBER_1 + "123",
    });
    expect(response.status).toBe(411);
  })

})
>>>>>>> 4835732643a8d6184db29177f6e55afe18219b1d
