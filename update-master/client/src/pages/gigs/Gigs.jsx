/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import Pagination1 from './Pagination'

function Gigs() {
  const [page,setPage] = useState(1)
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  // Fetch gigs data based on search filters and sorting
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}&page=${page}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  // Callback function to change the sorting type
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort,page]);

  // Apply the selected filters
  const apply = () => {
    setPage(1);
    refetch();
  };
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs"></span>
        <h1>{search.split("=")[1]}</h1>
        <p>
          Explore the boundaries of art and technology with{" "}
          <span>Skillify's {search.split("=")[1]}</span>
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {/* Render gig cards */}
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.gigs.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
        {data?.totalPages > 1 && (
  <div className="pagination-container">
    <Pagination1
      totalPages={data.totalPages}
      currentPage={page}
      onPageChange={handlePageChange}
    />
    <div className="pagination-info">
      Page {page} of {data.totalPages}
    </div>
    <div className="pagination-buttons">
      {page > 1 && (
        <button
          className="prev-button"
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
      )}
      {page < data.totalPages && (
        <button
          className="next-button"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      )}
    </div>
  </div>
)}
        </div>
    </div>
  );
}

export default Gigs;
