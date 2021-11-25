const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../server.js");
const should = chai.should();
const expect = chai.expect;
const ticketsMock = require("../../tickets.json");

describe("GET /getAllTickets", () => {
  it("should return a status code of 200 if API is available", (done) => {
    chai
      .request("http://localhost:8000")
      .get("/getAllTickets")
      .end((err, res) => {
        res.should.have.status(200);
        //   expect(res.body).to.deep.equal(JSON.stringify(ticketsMock));
        done();
      });
  });
});

describe("GET /getTicket", () => {
  it("should pass and return a status of 404 since null id is passed", (done) => {
    chai
      .request("http://localhost:8000")
      .get("/getTicket/null")
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).to.deep.equal({});
        done();
      });
  });
});
