import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Dividend {
  year: string;
  months: { [month: string]: string };
}

interface Props {
  data: {
    "Monthly Adjusted Time Series": {
      [date: string]: {
        "7. dividend amount": string;
      };
    };
  };
}

const DividendByMonth: React.FC<Props> = ({ data }) => {
  const [dividendsByYear, setDividendsByYear] = useState<Dividend[]>([]);

  useEffect(() => {
    if (data?.["Monthly Adjusted Time Series"]) {
      const monthlyData = data["Monthly Adjusted Time Series"];

      // Grouping data by year
      const groupedByYear: { [year: string]: { [month: string]: string } } = {};
      // biome-ignore lint/complexity/noForEach: <explanation>
      Object.keys(monthlyData).forEach((date) => {
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        if (!groupedByYear[year]) {
          groupedByYear[year] = {};
        }
        groupedByYear[year][month] = monthlyData[date]["7. dividend amount"];
      });

      const dividends: Dividend[] = Object.keys(groupedByYear).map((year) => {
        const months = groupedByYear[year];
        const formattedMonths: { [month: string]: string } = {};

        // Iterate through each month's dividend amount
        Object.keys(months).forEach((month) => {
          const dividendAmount = months[month];
          // If dividend amount is 0, set it to "-"
          formattedMonths[month] =
            dividendAmount === "0.0000" ? "-" : dividendAmount;
        });

        return {
          year,
          months: formattedMonths,
        };
      });

      setDividendsByYear(dividends);
    }
  }, [data]);

  return (
    <div className="mt-6 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Jan</TableHead>
            <TableHead>Feb</TableHead>
            <TableHead>Mar</TableHead>
            <TableHead>Apr</TableHead>
            <TableHead>May</TableHead>
            <TableHead>Jun</TableHead>
            <TableHead>Jul</TableHead>
            <TableHead>Aug</TableHead>
            <TableHead>Sep</TableHead>
            <TableHead>Oct</TableHead>
            <TableHead>Nov</TableHead>
            <TableHead>Dec</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dividendsByYear.toReversed().map((dividend, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index}>
              <TableCell>{dividend.year}</TableCell>
              <TableCell>{dividend.months["01"]}</TableCell>
              <TableCell>{dividend.months["02"]}</TableCell>
              <TableCell>{dividend.months["03"]}</TableCell>
              <TableCell>{dividend.months["04"]}</TableCell>
              <TableCell>{dividend.months["05"]}</TableCell>
              <TableCell>{dividend.months["06"]}</TableCell>
              <TableCell>{dividend.months["07"]}</TableCell>
              <TableCell>{dividend.months["08"]}</TableCell>
              <TableCell>{dividend.months["09"]}</TableCell>
              <TableCell>{dividend.months["10"]}</TableCell>
              <TableCell>{dividend.months["11"]}</TableCell>
              <TableCell>{dividend.months["12"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DividendByMonth;
