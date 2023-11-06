import React, { useEffect, useState } from "react";

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
    "October",
    "November",
    "December",
  ];
  const longName = monthNames[monthNow - 1];

  const [jadwalSholat, setJadwalSholat] = useState({});
  const [date, getDate] = useState(dateNow);
  const [month, getMonth] = useState(monthNow);
  const [year, getYear] = useState(yearNow);
  const [clock, setClock] = useState(new Date());

  const refreshClock = () => {
    setClock(new Date());
  };
  const getApi = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/sholat/jadwal/1606/${year}/${month}/${date}`
    );
    const data = await res.json();

    setJadwalSholat(data);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#1C0A00";
    getApi();
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <section className="font-poppins">
      <div className="container mx-auto py-4 px-4 items-center md:px-24">
        <div className="justify-center text-center">
          <p className="border-b border-red-600 pb-4 text-7xl leading-tight font-bold text-secondary">
            Ayo Sholat!
          </p>
        </div>
        <div className="flex flex-wrap gap-2 px-4 py-4 justify-center mb-2 text-secondary">
          <h1 className="text-lg font-medium md:text-2xl">
            Gresik, {date} {longName} {year}
          </h1>
          <span className="text-lg text-blue-800 font-medium md:text-2xl text-secondary">
            {clock.toLocaleTimeString("fr-FR")}
          </span>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Subuh
          </p>
          <p className="w-full px-4 text-end text-lg font-medium text-secondary">
            {jadwalSholat.data?.jadwal.subuh}
          </p>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Dhuhur
          </p>
          <p className="w-full px-4 text-end text-lg font-medium text-secondary">
            {jadwalSholat.data?.jadwal.dzuhur}
          </p>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Ashar
          </p>
          <p className="w-full px-4 text-end text-lg font-medium text-secondary">
            {jadwalSholat.data?.jadwal.ashar}
          </p>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="w-full px-4 text-lg font-medium text-secondary">
            Maghrib
          </p>
          <p className="w-full px-4 text-end text-lg font-medium text-secondary">
            {jadwalSholat.data?.jadwal.maghrib}
          </p>
        </div>
        <div className="flex flex-row justify-center mb-10">
          <p className="w-full px-4 text-lg font-medium text-secondary">Isya</p>
          <p className="w-full px-4 text-end text-lg font-medium text-secondary">
            {jadwalSholat.data?.jadwal.isya}
          </p>
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
      </div>
    </section>
  );
};
export default Home;
