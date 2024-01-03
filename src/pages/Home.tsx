import { FC } from "react";
import { Button, Chart, List, SimpleItem, LegendItem } from "@/components";
import { IoCalendarNumberOutline, IoAdd } from "react-icons/io5";

interface NetChange {
  concept: string;
  value: string;
}

const netChangeList: NetChange[] = [
  {
    concept: "Headcount",
    value: "+379",
  },
  {
    concept: "Starting Headcount",
    value: "4.85k",
  },
  {
    concept: "Ending Headcount",
    value: "5.23k",
  },
  {
    concept: "Net in",
    value: "720",
  },
  {
    concept: "Net out",
    value: "348",
  },
];

const chartColorMap = {
  Scans: "#9bebb4",
  Exits: "#fdacaa",
  Discrepancies: "#c4c8cf",
  "Net Change": "#bedcfe",
};

const legendLabelColorMap = {
  Scans: "text-[#49de80]",
  Exits: "text-[#f87171]",
  Discrepancies: "text-[#9ca3af]",
  "Net Change": "text-[#92c5fd]",
};

const xAxisData = [
  "Expantion",
  "Replacement",
  "Involuntary Turnover",
  "Voluntary Turnover",
  "Discrepancies",
  "Net Change",
];

const Home: FC = () => {
  return (
    <main className="w-full min-h-screen flex">
      {/* left */}
      <section className="w-3/4 flex flex-col min-h-full px-4 py-6 bg-white">
        <h1 className="w-fit p-[6px] bg-white rounded-sm border border-solid border-gray-200 text-sm leading-none font-semibold">
          Employee Movement Breakdown
        </h1>
        <div className="flex space-x-7 mt-2 mb-10">
          <Button
            as="secondary"
            size="small"
            startIcon={<IoCalendarNumberOutline className="text-base" />}
          >
            2019
          </Button>
          <Button
            as="secondary"
            size="small"
            startIcon={<IoAdd className="text-base" />}
          >
            Add Filter
          </Button>
        </div>

        <Chart colorMap={chartColorMap} xAxisData={xAxisData} />
      </section>

      {/* right */}
      <section className="w-1/4 flex flex-col min-h-full bg-[#f3f4f6] shadow-2xl border-l-1 border-solid border-gray-200 px-1 py-4">
        <h2 className="text-lg font-extrabold pl-4">Net Change</h2>
        <List className="mt-6">
          {netChangeList.map((item) => (
            <SimpleItem
              key={item.concept}
              name={item.concept}
              value={item.value}
            />
          ))}
        </List>
        <h2 className="text-lg font-bold mx-4 mt-6 border-b border-solid border-gray-200 pb-1">
          Legend
        </h2>
        <h3 className="text-sm font-semibold px-4 mt-2 text-gray-700">
          Movement Summary
        </h3>
        <List className="mt-3 list-disc list-inside">
          {Object.keys(legendLabelColorMap).map((item) => (
            <LegendItem
              key={item}
              name={item}
              color={
                legendLabelColorMap[item as keyof typeof legendLabelColorMap]
              }
            />
          ))}
        </List>
      </section>
    </main>
  );
};

export default Home;
