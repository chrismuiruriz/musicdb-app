import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  //handle on search form submit
  function handleOnSearchSubmit(e) {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    searchInput.value = "";

    //if search is not empty
    if (searchValue) {
      //redirect to search page
      navigate(`/search/${encodeURI(searchValue)}`, { replace: true });
    }
  }

  return (
    <header className="bg-white shadow-md shadow-zinc-100 py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex items-stretch">
        <div>
          <img
            src="https://via.placeholder.com/400x200"
            className="App-logo h-14 md:h-16 w-auto"
            alt="logo"
          />
        </div>

        <form
          className="flex-1 flex items-stretch md:pl-12"
          onSubmit={handleOnSearchSubmit}
        >
          <div className="flex items-center pr-4">
            <svg
              className="text-gray-400 h-6 w-6 fill-current"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search"
            required
            id="search-input"
            className="flex-1 outline-none text-xl tracking-wide px-4"
          />
        </form>
      </div>
    </header>
  );
}

export default Header;