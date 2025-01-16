import { describe, expect, test, it } from 'vitest'
import axios from "axios"

const BACKEND_URL = "http://localhost:8080"

const PHONE_NUMBER_1 = "7060334001";
const NAME_1 = "harkirat";

describe("Signup endpoints", () => {

  it('Double user signup doesnt work', async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      number: PHONE_NUMBER_1,
    });

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
      name: NAME_1,
      otp: "000000"
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.data.id).not.toBeNull();

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
      otp: "000000"
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.data.id).not.toBeNull();

    expect(async () => {
      await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
        phoneNumber: PHONE_NUMBER_1,
      });
    }).toThrow();



  })
