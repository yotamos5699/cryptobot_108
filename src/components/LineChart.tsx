import React, { useEffect, useState } from "react";
const colorArray = [
  "#82ca9d",
  "#8884d8",
  "#8884d8",
  "#808000",
  "#FFFF00",
  "#00FF00",
  "#FF00FF",
  "#FF0000",
  "#90ee90",
  "#ff69b4",
  "#adff2f",
  "#ffd700",
  "#f8f8ff",
  "#ff1493",
  "#ff8c00",
  "#ff7f50",
  "#7fffd4",
  "#00FFFF",
  "#008080",
  "#20b2aa",
  "#778899",
  "#00ff00",
  "#ff00ff",
  "#3cb371",
  "#ffe4e1",
  "#ff4500",
  "#afeeee",
];
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const t_hash = {
  "1m": "value",
  "5m": "value_5",
  "15m": "value_15",
  "30m": "value_30",
  "1h": "value_60",
};
const setMainGraphData = (gap_Key: string, data: any[]) => {
  const values: any = [];
  const res = data.map((row) => {
    if (row[gap_Key as keyof typeof row] > 0)
      values.push(row[gap_Key as keyof typeof row]);
    return {
      time: row.time_stemp,
      [row.coin_id]: row[gap_Key as keyof typeof row],
    };
  });

  return { res: res, mv: values };
};
const setHelpersGraphData = (gap_Key: string, data: any[], strat: any) => {
  const values: any = [];

  let short_array = [];
  let long_array = [];

  for (let i = 0; i <= data.length - strat.longEmaRatio; i++) {
    let x = 1;
    let sum = 0.0;
    for (let j = i; j <= i + strat.longEmaRatio; j++) {
      let row = data[i];
      let value = row[gap_Key as keyof typeof row];
      sum += value;
      values.push(row[gap_Key as keyof typeof row]);
      if (x == strat.shortEmaRatio)
        short_array.push({
          time: data[i].time_stemp,
          [row.coin_id]: sum / strat.shortEmaRatio,
        });
      if (x == strat.longEmaRatio)
        long_array.push({
          time: data[i].time_stemp,
          [row.coin_id]: sum / strat.longEmaRatio,
        });
    }
  }
  return {
    s_res: short_array,
    l_res: long_array,
    vals: values,
  };
};

function LineChart_(props: { data: any[]; timeGap: string; strat: any }) {
  console.log({ props });
  const [Plot, setPlot] = useState<any>();
  const [joinedPlots, setJoinedPlots] = useState();
  const [YAxisRange, setYAxisRange] = useState<any>();

  useEffect(() => {
    let resB: any;
    let values: any = [];
    const { res, mv } = setMainGraphData(
      t_hash[props.timeGap as keyof typeof t_hash],
      props.data
    );
    if (Plot) {
      //{ s_res, l_res, vals }
      resB = setHelpersGraphData(
        t_hash[props.timeGap as keyof typeof t_hash],
        props.data,
        props.strat
      );
    }
    values = resB.vals ? [...mv, ...resB.vals] : [...mv];

    setYAxisRange({ l: Math.min(...values), h: Math.max(...values) });
    setPlot({ data: [...res], main_key: props.data[0].coin_id });
  }, [props.data, props.timeGap, props.strat]);
  useEffect(() => {
    console.log({ Plot, YAxisRange });
  }, [Plot, YAxisRange]);
  console.log(props);
  console.log({ props });
  return (
    <ResponsiveContainer height={700} width="100%">
      
      {Plot && (
        <div>
          <div><button>sss</button><button>ddd</button><button>kyk</button></div>
        <LineChart
          // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          width={300}
          height={300}
          data={[...Plot.data].reverse()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[YAxisRange.l, YAxisRange.h]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={Plot.main_key}
            stroke={colorArray[1]}
            strokeDasharray="5 5"
          />
          );
          {/* <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeDasharray="3 4 5 2"
        /> */}
        </LineChart>
        </div>
      )}
    </ResponsiveContainer>
  );
}

export default LineChart_;
