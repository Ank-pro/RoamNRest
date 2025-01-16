import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { LoginPage } from "./components/LoginPage/LoginPage";
import NavBar from "./components/Navbar/NavBar";
import { HotelCard } from "./components/HotelCard/HotelCard";
import { Categories } from "./components/Categories/Categories";

function App() {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hotel?page=${page}`
      );
      if (response.data.length > 0) {
        setHotels((prev) => [...prev, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, hasMore]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <NavBar />
        <Categories/>
        <main className="hotel-container">
          {hotels.map((hotel) => (
            <HotelCard hotel={hotel} key={hotel._id} />
          ))}
        </main>
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more hotels to load.</p>}
      </div>
    </>
  );
}

export default App;