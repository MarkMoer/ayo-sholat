import React, { useEffect, useState, useRef } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Home = () => {
  const d = new Date();
  const dateNow = d.getDate();
  const monthNow = d.getMonth() + 1;
  const yearNow = d.getFullYear();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const longName = monthNames[monthNow - 1];

  const searchRef = useRef();
  const [searchCity, setSearchCity] = useState("Gresik");
  const [jadwalSholat, setJadwalSholat] = useState({});
  const [date, setDate] = useState(dateNow);
  const [year, setYear] = useState(yearNow);
  let [clock, setClock] = useState(new Date());

  let refreshClock = () => {
    setClock(new Date());
  };
  const getApi = async () => {
    const city = searchCity.toLowerCase();
    const monthAPI = monthNow.toString().length < 2 ? `0${monthNow}` : monthNow;
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/${city}/${year}/${monthAPI}.json`
    );

    const data = await res.json();
    setJadwalSholat(data);
  };

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;
    if (!keyword || keyword.trim() == "") return;
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      setSearchCity(keyword);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#1C0A00";
    getApi();
    let timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [searchCity]);

  return (
    <section className="font-poppins">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row p-4 justify-between gap-2 bg-secondary md:px-32">
        <a
          href="/"
          className="font-bold text-primary text-xl p-1 justify-center items-center"
        >
          emefka
        </a>
        <div className="flex md:order-2 gap-3 items-center">
          <div className="relative w-full">
            <input
              placeholder="cari kota..."
              className="w-full p-2 rounded-md"
              ref={searchRef}
              onKeyDown={handleSearch}
            />

            <button className="absolute top-2 end-2">
              <MagnifyingGlass size={24} onClick={handleSearch} />
            </button>
          </div>
          <div className="">
            <a
              href="https://github.com/MarkMoer/ayo-sholat"
              target="_blank"
              className="w-12 h-12 mr-3 rounded-lg flex justify-center items-center border border-primary"
            >
              <svg
                role="img"
                width="20"
                className="fill-primary"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/*Content  */}

      <div className="container mx-auto py-4 px-4 items-center md:px-24">
        <div className="justify-center text-center">
          <p className="border-b border-red-600 pb-4 text-7xl leading-tight font-bold text-secondary">
            Ayo Sholat!
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4 py-4 justify-center mb-2 text-secondary items-center md:flex-row md:justify-between">
          <h1 className="text-lg font-medium md:text-2xl">
            {searchCity}, {date} {longName} {year}
          </h1>
          <span className="text-lg text-blue-800 font-medium md:text-2xl text-secondary">
            {clock.toLocaleTimeString("fr-FR")}
          </span>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Subuh
          </p>
          <div className="rounded-xl bg-secondary">
            <p className="w-full px-4 text-end text-lg font-medium text-primary">
              {jadwalSholat[date - 1]?.shubuh}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Dhuhur
          </p>
          <div className="rounded-xl bg-secondary">
            <p className="w-full px-4 text-end text-lg font-medium text-primary">
              {jadwalSholat[date - 1]?.dzuhur}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Ashar
          </p>
          <div className="rounded-xl bg-secondary">
            <p className="w-full px-4 text-end text-lg font-medium text-primary">
              {jadwalSholat[date - 1]?.ashr}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Maghrib
          </p>
          <div className="rounded-xl bg-secondary">
            <p className="w-full px-4 text-end text-lg font-medium text-primary">
              {jadwalSholat[date - 1]?.magrib}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center mb-10">
          <p className="w-full px-4 text-lg font-medium text-secondary">Isya</p>
          <div className="rounded-xl bg-secondary">
            <p className="w-full px-4 text-end text-lg font-medium text-primary">
              {jadwalSholat[date - 1]?.isya}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <p className="text-center mb-2 text-lg font-medium italic text-secondary">
            Jagalah Sholatmu, karena ketika kau kehilangannya, kamu akan
            kehilangan yang lainnya
          </p>
          <p className="text-center text-lg font-medium text-secondary">
            ~ Umar bin Khattab ~
          </p>
        </div>

        {/* Logo Tech Stack */}
        <div className="flex items-center justify-center pt-10 gap-2">
          {/* Vite */}
          <a
            href="https://vitejs.dev/"
            target="_blank"
            className="w-9 h-9 mr-3 rounded-full flex justify-center items-center border border-secondary"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-secondary"
            >
              <title>Vite</title>
              <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z" />
            </svg>
          </a>
          {/* React */}
          <a
            href="https://react.dev/"
            target="_blank"
            className="w-9 h-9 mr-3 rounded-full flex justify-center items-center border border-secondary"
          >
            <svg
              className="fill-secondary"
              width="20"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>React</title>
              <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
            </svg>
          </a>
          {/* Tailwind */}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            className="w-9 h-9 mr-3 rounded-full flex justify-center items-center border border-secondary"
          >
            <svg
              className="fill-secondary"
              width="25"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Tailwind CSS</title>
              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
export default Home;
