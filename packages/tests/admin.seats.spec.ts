import { describe, expect, test, it, beforeAll } from 'vitest'
import { axios } from "./axios";
import { getRandomNumber } from './utils/number';

const BACKEND_URL = "http://localhost:8080"

describe("events", () => {
    let token = "";
    let superAdminToken = "";
    let eventId = "";

    beforeAll(async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/test/create-admin`, {
            number: getRandomNumber(10),
            name: "Samay",
        });

        const superAdminResponse = await axios.post(`${BACKEND_URL}/api/v1/test/create-super-admin`, {
            number: getRandomNumber(10),
            name: "Samay",
        });

        token = response.data.token;
        superAdminToken = superAdminResponse.data.token;

        const locationResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/location`, {
            name: "Delhi",
            description: "Delhi, the capital of the country",
            imageUrl: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            }, {
                headers: {
                    Authorization: `${superAdminToken}`
            }
        });
        const eventResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/event`, { 
            name: "Live event latent fest",
            description: "Latent fest is a premere fest for members",
            startTime: "2022-10-10 10:00:00",
            locationId: locationResponse.data.id,
            banner: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            seats: []
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        eventId = eventResponse.data.id;
    });

    it('Can add seats for event that does exist', async () => {
        const response = await axios.put(`${BACKEND_URL}/api/v1/admin/event/seats/${eventId}`, {
            seats: [{
                name: "Seat 1",
                description: "Seat 1 description",
                price: 100,
                capacity: 10
            }]
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        const eventResponse = await axios.get(`${BACKEND_URL}/api/v1/admin/event/${eventId}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        
        expect(response.status).toBe(200);
        expect(eventResponse.status).toBe(200);
        expect(eventResponse.status).toBe(200);
        console.log(eventResponse.data)
        expect(eventResponse.data.event.seatTypes.length).toBe(1);
    })   

    it('Can delete seats for event that does exist', async () => {
        const response = await axios.put(`${BACKEND_URL}/api/v1/admin/event/seats/${eventId}`, {
            seats: []
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        const eventResponse = await axios.get(`${BACKEND_URL}/api/v1/admin/event/${eventId}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        
        expect(response.status).toBe(200);
        expect(eventResponse.status).toBe(200);
        expect(eventResponse.status).toBe(200);
        console.log(eventResponse.data)
        expect(eventResponse.data.event.seatTypes.length).toBe(0);
    })   

    it('Can update seats for event that does exist', async () => {
        const response = await axios.put(`${BACKEND_URL}/api/v1/admin/event/seats/${eventId}`, {
            seats: [{
                name: "Seat 1",
                description: "Seat 1 description",
                price: 100,
                capacity: 10
            }]
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        const eventResponse = await axios.get(`${BACKEND_URL}/api/v1/admin/event/${eventId}`, {
            headers: {
                Authorization: `${token}`
            }
        });

        const seatId = eventResponse.data.event.seatTypes[0].id;

        console.log({
            id: seatId,
            name: "Seat 2",
            description: "Seat 1 description",
            price: 100,
            capacity: 100
        })
        const updateSeatResponse = await axios.put(`${BACKEND_URL}/api/v1/admin/event/seats/${eventId}`, {
            seats: [{
                id: seatId,
                name: "Seat 2",
                description: "Seat 2 description",
                price: 1000,
                capacity: 1000
            }]
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        // Write a get request to check if the seat is updated
        const updatedSeatResponseGet = await axios.get(`${BACKEND_URL}/api/v1/admin/event/${eventId}`, {
            headers: {
                Authorization: `${token}`
            }
        });

        console.log("updatedSeatResponseGet.data.event.seatTypes")
        console.log(updatedSeatResponseGet.data);
        
        console.log("eventResponse.data.event.seatTypes")
        console.log(eventResponse.data.event.seatTypes)
        
        expect(updateSeatResponse.status).toBe(200);
        expect(response.status).toBe(200);
        expect(eventResponse.status).toBe(200);
        expect(eventResponse.data.event.seatTypes.length).toBe(1);
        expect(updatedSeatResponseGet.data.event.seatTypes[0].name).toBe("Seat 2");
    })   
})