const request_url = require("supertest")("https://restful-booker.herokuapp.com");
const assert = require("chai").expect;

describe("Booking Functionality", function(){

    // API to add booking
    it("Success Add Booking", async function(){

        const response = await request_url
            .post("/booking")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                "firstname" : "Rika",
                "lastname" : "Yulianto",
                "totalprice" : 150000,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2023-04-16",
                    "checkout" : "2023-04-17"
                },
                "additionalneeds" : "Lunch"
            });
        
        // add temp bookingId to variable, because bookingId is dynamic
        var bookingId = response.body.bookingid;

        assert(response.statusCode).to.eql(200);
        assert(response.body.bookingid).to.eql(bookingId);
        assert(response.body.booking.firstname).to.eql("Rika");
        assert(response.body.booking.lastname).to.eql("Yulianto");
        assert(response.body.booking.totalprice).to.eql(150000);
        assert(response.body.booking.depositpaid).to.eql(true);
        assert(response.body.booking.bookingdates.checkin).to.eql("2023-04-16");
        assert(response.body.booking.bookingdates.checkout).to.eql("2023-04-17");
        assert(response.body.booking.additionalneeds).to.eql("Lunch");
    });
    it("Get Single Booking", async function(){

        const response = await request_url
            .get("/booking/1")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send();

        // console.log(response.body); -- to debugging

        // add temp data to variable, because data is dynamic
        var firstName = response.body.firstname;
        var lastName = response.body.lastname;
        var totalPrice = response.body.totalprice;
        var depositPaid = response.body.depositpaid;
        var checkIn = response.body.bookingdates.checkin;
        var checkOut = response.body.bookingdates.checkout;

        assert(response.statusCode).to.eql(200);
        assert(response.body.firstname).to.eql(firstName);
        assert(response.body.lastname).to.eql(lastName);
        assert(response.body.totalprice).to.eql(totalPrice);
        assert(response.body.depositpaid).to.eql(depositPaid);
        assert(response.body.bookingdates.checkin).to.eql(checkIn);
        assert(response.body.bookingdates.checkout).to.eql(checkOut);
        assert(response.body.additionalneeds).to.eql("Breakfast");
    });
    it("Get Booking IDs", async function(){

        const response = await request_url
            .get("/booking")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send();

        // add temp data to variable, because data is dynamic
        var bookingIdFirst = response.body[0].bookingid;
        var bookingIdSecond = response.body[1].bookingid;
        var bookingIdThird = response.body[2].bookingid;

        assert(response.statusCode).to.eql(200);
        assert(response.body[0].bookingid).to.eql(bookingIdFirst);
        assert(response.body[1].bookingid).to.eql(bookingIdSecond);
        assert(response.body[2].bookingid).to.eql(bookingIdThird);
    });
});

// ------- Result -------
// PS F:\QA Bootcamp\Project\Github\API-Automation-MochaChai> npx mocha booking.js


//   Booking Functionality
//     ✔ Success Add Booking (1216ms)
//     ✔ Get Single Booking (1016ms)
//     ✔ Get Booking IDs (963ms)


//   3 passing (3s)