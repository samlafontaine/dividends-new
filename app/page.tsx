"use client";

import React, { useState } from "react";
import DividendByMonth from "./dividends";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page: React.FC = () => {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null); // Update the type as per your data structure

  const fetchData = () => {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${ticker}&apikey=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4">Find company dividend information</h1>
      <div className="flex flex-row gap-2 w-8/12">
        <Input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter ticker symbol"
        />
        <Button type="submit" onClick={fetchData}>
          Fetch Data
        </Button>
      </div>
      {data && <DividendByMonth data={data} />}
    </div>
  );
};

export default Page;
