import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";


import spinningLoaders from "../../assets/spinning-circles.svg";
import { useGetSearchProductsQuery } from "../../api/searchApi";
import { PRODUCTINTERFACE } from "../../utils/interfaceTypes";
import { useNavigate } from "react-router-dom";
// import debounce from "lodash.debounce";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [delayedSearch, setDelayedSearch] = useState("");
  const delayTimeout = useRef(null);

  const { data: allData, isLoading } = useGetSearchProductsQuery(search)
  const data = allData?.filter((product: PRODUCTINTERFACE) => product.product_name.toLowerCase().includes(search.toLowerCase()));
  console.log({ data })

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    setShowList(true);
    if (delayTimeout.current) {
      clearTimeout(delayTimeout.current);
    }
    delayTimeout.current = setTimeout(() => {
      setDelayedSearch(e.target.value);
    }, 2000);
  };

  // const request = debounce(async () => {
  //   refetch()
  // }, 2000)

  // const debounceRequest = useCallback(() => {
  //   request()
  // }, [])


  const submitHandler = (e: any) => {
    e.preventDefault();
    setShowList(false);
  };



  return (
    <>
      <form
        onSubmit={submitHandler}
        className={`flex items-center bg-black/[0.075] px-3 ${search && showList ? "rounded-t-md" : "rounded-full"
          } text-sm transition`}
      >
        <input
          className="w-full py-2 px-3 bg-transparent focus:outline-none"
          type="search"
          value={search}
          placeholder="Search Glasses"
          onChange={handleChange}
        />
        <CiSearch />
      </form>
      {search && showList && (
        <ul className="absolute bg-amber-50 w-full max-h-72 overflow-auto rounded-b-md z-10">
          {isLoading ? (
            <li className="h-10 flex items-center justify-center">
              <img src={spinningLoaders} alt="Searching..." />
            </li>
          ) : data?.length ? (
            data.map((product: PRODUCTINTERFACE) => (
              <li
                onClick={() => {
                  navigate(`/products/${product?.id}`)
                  setShowList(false);
                  setSearch("");
                }}
                className="h-10 flex items-center justify-center hover:bg-amber-100 cursor-pointer"
              >
                {product?.product_name}
              </li>
            ))
          ) : (
            <li className="h-10 flex items-center justify-center">
              No Item to show
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Search;

