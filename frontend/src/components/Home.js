import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "../Paginate.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false); // to monitor fetching data
  const [tickets, setTickets] = useState([]); //to store tickets
  const [selectedTicket, setSelectedTicket] = useState({ id: null }); //to monitor selected ticket
  const [pageNumber, setPageNumber] = useState(0); //to monitor page number
  const [fetchStatus, setFetchstatus] = useState(null); //fetch status to check if data could be fetched

  const ticketsPerPage = 25;
  const ticketsVisited = pageNumber * ticketsPerPage;

  const displayTickets = tickets // to show given slice of tickets in a page
    .slice(ticketsVisited, ticketsVisited + ticketsPerPage)
    .map((ticket) => {
      return (
        <button
          className={
            selectedTicket.id === ticket.id ? "bg-green-200" : "bg-gray-200"
          }
          onClick={() => setSelectedTicket(ticket)}
        >
          {ticket.subject}
        </button>
      );
    });

  const pageCount = Math.ceil(tickets.length / ticketsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchTickets = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/getAllTickets").then((res) => {
      // console.log(res);
      if (res.ok) {
        res.json().then((data) => {
          data = JSON.parse(data);
          setTickets(data.tickets);
          setFetchstatus(true);
          setIsLoading(false);
        });
      } else {
        setFetchstatus(false);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center container mx-auto">
        Loading....
      </div>
    );
  }

  if (fetchStatus == false) {
    // if fetch failed
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center container mx-auto">
        <p className="text-4xl pb-20">
          <b>ZCC Ticket Viewer</b>
        </p>
        <p>Sorry, Tickets couldn't be fetched. The API is unavailable.</p>
      </div>
    );
  } else {
    // if fetch is in process or fetch is succesful
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center container mx-auto">
        <p className="text-4xl pb-20">
          <b>ZCC Ticket Viewer</b>
        </p>
        {tickets.length !== 0 ? (
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div className="flex flex-col overflow-auto h-80">
                {displayTickets}
              </div>
              <div className="ml-16 mt-10">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </div>
            <div>
              {selectedTicket.id ? (
                <div>
                  <Link to={`/ticket/${selectedTicket.id}`}>
                    <button className="text-2xl pb-2">
                      <b>Subject</b> : {selectedTicket.subject}
                    </button>
                  </Link>
                  <p>
                    {" "}
                    <b> ID </b> : {selectedTicket.id}{" "}
                  </p>
                  <p>
                    {" "}
                    <b> Description </b> : {selectedTicket.description}
                  </p>
                </div>
              ) : (
                <p>Please click on a ticket!</p>
              )}
            </div>
          </div>
        ) : (
          <button
            className="rounded border bg-blue-200 p-2 m-2"
            onClick={fetchTickets}
          >
            Fetch Tickets
          </button>
        )}
      </div>
    );
  }
};

export default Home;
