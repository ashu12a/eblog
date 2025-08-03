import React from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";

const DashboardCards = [
  {
    title: "Total Page Views",
    price: "4,42,236",
    trend: "up",
    percent: "56.60%",
    extra: "35,000",
  },
  {
    title: "Total Sales",
    price: "6,12,226",
    trend: "up",
    percent: "80.20%",
    extra: "4,230",
  },
  {
    title: "Total Users",
    price: "1,52,236",
    trend: "down",
    percent: "26.42%",
    extra: "1,230",
  },
  {
    title: "Total Order",
    price: "2,32,236",
    trend: "down",
    percent: "26.42%",
    extra: "2,345",
  },
];

const LineChartMonthData = [
  {
    name: "Jan",
    "Page Views": 0,
    Sessions: 0,
  },
  {
    name: "Feb",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Mar",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Apr",
    "Page Views": 45,
    Sessions: 35,
  },
  {
    name: "May",
    "Page Views": 55,
    Sessions: 45,
  },
  {
    name: "Jun",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Jul",
    "Page Views": 65,
    Sessions: 25,
  },
  {
    name: "Aug",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Sept",
    "Page Views": 65,
    Sessions: 45,
  },
  {
    name: "Oct",
    "Page Views": 75,
    Sessions: 55,
  },
  {
    name: "Nov",
    "Page Views": 85,
    Sessions: 80,
  },
  {
    name: "Dec",
    "Page Views": 100,
    Sessions: 90,
  },
];

const LineChartWeekData = [
  {
    name: "Sun",
    "Page Views": 0,
    Sessions: 0,
  },
  {
    name: "Mon",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Tue",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Wed",
    "Page Views": 45,
    Sessions: 35,
  },
  {
    name: "Thu",
    "Page Views": 55,
    Sessions: 45,
  },
  {
    name: "Fri",
    "Page Views": 35,
    Sessions: 15,
  },
  {
    name: "Sat",
    "Page Views": 65,
    Sessions: 25,
  },
];

const BarChartData = [
  {
    name: "Mon",
    "Series-1": 10,
  },
  {
    name: "Tue",
    "Series-1": 35,
  },
  {
    name: "Wed",
    "Series-1": 30,
  },
  {
    name: "Thu",
    "Series-1": 45,
  },
  {
    name: "Fri",
    "Series-1": 55,
  },
  {
    name: "Sat",
    "Series-1": 65,
  },
  {
    name: "Sun",
    "Series-1": 75,
  },
];

export default function Dashboard() {
  const [areaChart, setAreaChart] = React.useState("month");
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-6">
        {DashboardCards.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            price={item.price}
            trend={item.trend}
            percent={item.percent}
            extra={item.extra}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 my-6">
        <div className="col-span-2 ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg tracking-wide font-medium text-neutral-800">
              Unique Visitor
            </p>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setAreaChart("month")}
                className={`${
                  areaChart === "month"
                    ? "bg-blue-100 border-blue-500 text-blue-500 border"
                    : "bg-neutral-100 border-neutral-500 text-neutral-500"
                }  px-2 text-xs py-1 rounded  tracking-wide font-medium`}
              >
                Month
              </button>
              <button
                onClick={() => setAreaChart("week")}
                className={`${
                  areaChart === "week"
                    ? "bg-blue-100 border-blue-500 text-blue-500 border"
                    : "bg-neutral-100 border-neutral-500 text-neutral-500"
                } px-2 text-xs py-1 rounded  tracking-wide font-medium`}
              >
                Week
              </button>
            </div>
          </div>
          <div className="bg-white pl-4 pt-6 pr-6 pb-2 rounded border border-gray-200">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={
                  areaChart === "month" ? LineChartMonthData : LineChartWeekData
                }
                margin={{ top: 0, right: 0, left: -35, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorPageViews"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00a2ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00a2ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorSessions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#44ff00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#44ff00" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="1 0"
                  horizontal={true}
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: "0.75rem" }}
                />
                <YAxis stroke="#94a3b8" tick={{ fontSize: "0.75rem" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    color: "white",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="Page Views"
                  stroke="#00a2ff"
                  strokeWidth={2}
                  fill="url(#colorPageViews)"
                />
                <Area
                  type="monotone"
                  dataKey="Sessions"
                  stroke="#44ff00"
                  strokeWidth={2}
                  fill="url(#colorSessions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg tracking-wide font-medium text-neutral-800">
            Income Overview
          </p>
          <div
            className="px-6 pt-6 pb-2 bg-white rounded border border-gray-200 h-full recharts-responsive-container "
            tabindex="-1"
          >
            <div className="flex flex-col gap-2">
              <p className="text-neutral-500 tracking-wide">
                This Week Statistics
              </p>
              <p className="text-neutral-900 font-semibold text-2xl">$7,650</p>
            </div>
            <ResponsiveContainer width="100%" height={330}>
              <BarChart
                data={BarChartData}
                margin={{ top: 10, right: 0, left: 5, bottom: 0 }}
              >
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    color: "white",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                   cursor={{ fill: "transparent" }} 
                />

                {/* Bars */}
                <Bar
                  dataKey="Series-1"
                  fill="#2cdecc"
                  radius={[4, 4, 0, 0]}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, price, trend, percent, extra }) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-4">
      <div className="text-sm text-neutral-500 mb-1 tracking-wide">{title}</div>
      <div className="flex justify-start items-center mb-1">
        <p className="text-2xl text-neutral-800 mb-2 font-medium tracking-wide">
          {price}
        </p>
        {trend === "up" ? (
          <div className="w-20 h-7 ml-3 -mt-1 bg-blue-100 rounded flex justify-center items-center">
            <IoIosTrendingUp className="text-blue-500" />
            <span className="text-blue-500 text-xs font-medium pl-1">
              {percent}
            </span>
          </div>
        ) : (
          <div className="w-20 h-7 ml-3 -mt-1 bg-red-100 rounded flex justify-center items-center">
            <IoIosTrendingDown className="text-red-500" />
            <span className="text-red-500 text-xs font-medium pl-1">
              {percent}
            </span>
          </div>
        )}
      </div>
      <p className="text-xs text-neutral-500 font-medium tracking-wide">
        You made an extra
        {trend === "up" ? (
          <span className="font-medium text-green-500 px-1">{extra}</span>
        ) : (
          <span className="font-medium text-red-500 px-1">{extra}</span>
        )}
        this year
      </p>
    </div>
  );
};
