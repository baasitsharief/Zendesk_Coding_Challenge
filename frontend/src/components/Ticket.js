import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({ status: null, data: null });

  useEffect(() => {
    fetch(`http://localhost:8000/getTicket/${id}`).then((res) => {
      // console.log(res);
      if (res.ok) {
        res.json().then((data) => {
          data = JSON.parse(data);
          setTicket({ status: true, data: data.ticket });
        });
      } else {
        setTicket({ status: false, data: null });
      }
    });
  }, []);

  if (ticket.status === null) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center container mx-auto">
        <p className="text-3xl pb-20">ZCC Ticket Viewer</p>
        <p> ... </p>
        <Link to={`/`}>
          <button className="text-2xl pb-20">
            <b>Home</b>
          </button>
        </Link>
      </div>
    );
  } else if (ticket.status === false) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center container mx-auto">
        <p className="text-3xl pb-20">ZCC Ticket Viewer</p>
        <p> Sorry, Ticket with id {id} not found. </p>
        <Link to={`/`}>
          <button className="text-2xl pb-20">
            <b>Home</b>
          </button>
        </Link>
      </div>
    );
  } else if (ticket.status === true) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center container mx-auto">
        <p className="text-4xl pb-20">
          <b>ZCC Ticket Viewer</b>
        </p>
        <p className="text-2xl pb-20">
          <b>Subject: </b>
          {ticket.data.subject}
        </p>
        <p>
          <b>Ticket id:</b> {ticket.data.id}
        </p>
        <p>
          <b>Description: </b>
          {ticket.data.description}
        </p>
        <div>
          <p>
            <b>Tags: </b>
          </p>
          {ticket.data.tags.map((tag) => (
            <p>{tag}</p>
          ))}
          <Link to={`/`}>
            <button className="text-2xl pb-2">
              <b>Home</b>
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Ticket;
