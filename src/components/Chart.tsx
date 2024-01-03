import * as echarts from "echarts";
import { FC, useRef, useEffect, useState, useLayoutEffect } from "react";
type EChartsOption = echarts.EChartsOption;

const calcTotal = (arr: number[], index = 1): number[] => {
  const originalArr = [...arr];

  const func = (arr: number[], index = 1): number[] => {
    if (index === arr.length - 1) {
      arr.unshift(0);
      return arr;
    }
    const copyArr = [...arr];

    const currNegative = originalArr[index] < 0;
    const nextNegative = originalArr[index + 1] < 0;

    if (!currNegative && nextNegative) {
      // trend to negative
      copyArr[index] =
        copyArr[index - 1] + originalArr[index] + originalArr[index + 1];
    } else if (currNegative && !nextNegative) {
      // trend to positive
      copyArr[index] = copyArr[index - 1]; // last value calculated
    } else {
      copyArr[index] = copyArr[index - 1] + copyArr[index] + originalArr[index];
    }

    return func(copyArr, index + 1);
  };

  return func(originalArr, index);
};

const getOptions = (
  myChart: echarts.ECharts,
  xAxisData: string[],
  colorMap: Record<string, string>
): EChartsOption => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        let tar;
        for (const param of params) {
          if (param?.value && param?.value !== "-") {
            tar = { ...param };
          }
        }
        return tar && tar.name + "<br/>" + tar.seriesName + ": " + tar.value;
      },
    },
    legend: {
      show: false,
      data: ["Scans", "Exits", "Discrepancies", "Net Change"],
    },
    grid: {
      left: "70vw",
      right: "70vw",
      top: "35vh",
      bottom: "35vh",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        fontSize: 11,
        interval: 0, // show all elements of X axis
        margin: 12,
      },
    },
    yAxis: {
      type: "value",
      max: 800,
      min: 0,
    },
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        barWidth: "90%",
        barGap: "-100%",
        silent: true,
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
        },
        data: calcTotal([379, 326, -118, -232, 7]),
      },
      {
        name: "Scans",
        type: "bar",
        stack: "Total",
        barWidth: "90%",
        barGap: "-100%",
        itemStyle: {
          color: colorMap["Scans"],
        },
        label: {
          show: true,
          position: "top",
          formatter: "+{c}",
          color: colorMap["Scans"],
        },
        data: [379, 326, "-", "-", "-", "-"],
      },
      {
        name: "Exits",
        type: "bar",
        stack: "Total",
        barWidth: "90%",
        barGap: "-100%",
        itemStyle: {
          color: colorMap["Exits"],
        },
        label: {
          show: true,
          position: "bottom",
          formatter: "-{c}",
          color: colorMap["Exits"],
        },
        data: ["-", "-", 118, 232, "-", "-"],
      },
      {
        name: "Discrepancies",
        type: "bar",
        stack: "Total",
        barWidth: "90%",
        barGap: "-100%",
        itemStyle: {
          color: colorMap["Discrepancies"],
        },
        label: {
          show: true,
          position: "top",
          formatter: "+{c}",
          color: colorMap["Discrepancies"],
        },
        data: ["-", "-", "-", "-", 7, "-"],
      },
      {
        name: "Net Change",
        type: "bar",
        barWidth: "90%",
        barGap: "-100%",
        itemStyle: {
          color: colorMap["Net Change"],
        },
        label: {
          show: true,
          position: "top",
          formatter: "+{c}",
          color: colorMap["Net Change"],
        },
        data: ["-", "-", "-", "-", "-", 362],
      },
    ],
    graphic: [
      {
        type: "text",
        left: "0%",
        bottom: "4%",
        style: {
          text: "{a|4.85k}\n{b|Starting\nHeadcount}",
          rich: {
            a: {
              fontSize: 14,
              fontWeight: "bold",
              align: "center",
              lineHeight: 16,
            },
            b: {
              fontSize: 11,
              align: "center",
              fontWeight: "lighter",
              lineHeight: 16,
              fill: "rgb(156 163 175)",
            },
          },
        },
      },
      {
        type: "text",
        right: "0%",
        bottom: "40%",
        style: {
          text: "{a|5.23k}\n{b|Ending\nHeadcount}",
          rich: {
            a: {
              fontSize: 14,
              fontWeight: "bold",
              align: "center",
              lineHeight: 16,
            },
            b: {
              fontSize: 11,
              align: "center",
              fontWeight: "lighter",
              lineHeight: 16,
              fill: "rgb(156 163 175)",
            },
          },
        },
      },
      {
        type: "group",
        bottom: "0%",
        left: "100vw",
        children: [
          {
            type: "line",
            shape: {
              x1: 0,
              y1: 0,
              x2:
                (xAxisData.indexOf("Replacement") / (xAxisData.length - 1)) *
                (myChart?.getWidth() * 0.67) *
                2,
              y2: 0,
            },
            style: {
              stroke: "rgb(107 114 128)",
              lineWidth: 2,
            },
          },
          {
            type: "text",
            left:
              (xAxisData.indexOf("Replacement") / (xAxisData.length - 1)) *
                (myChart.getWidth() * 0.67) -
              30,
            top: 10,
            style: {
              text: "INCOMING",
              fontSize: 11,
              align: "center",
              fontWeight: "lighter",
              lineHeight: 16,
              fill: "rgb(156 163 175)",
            },
          },
        ],
      },
      {
        type: "group",
        bottom: "0%",
        left:
          (xAxisData.indexOf("Replacement") / (xAxisData.length - 1)) *
          (myChart?.getWidth() * 0.67) *
          2 *
          1.4,
        children: [
          {
            type: "line",
            shape: {
              x1: 0,
              y1: 0,
              x2:
                (xAxisData.indexOf("Replacement") / (xAxisData.length - 1)) *
                (myChart?.getWidth() * 0.67) *
                2,
              y2: 0,
            },
            style: {
              stroke: "rgb(107 114 128)",
              lineWidth: 2,
            },
          },
          {
            type: "text",
            left:
              (xAxisData.indexOf("Replacement") / (xAxisData.length - 1)) *
                (myChart.getWidth() * 0.67) -
              30,
            top: 10,
            style: {
              text: "OUTGOING",
              fontSize: 11,
              align: "center",
              fontWeight: "lighter",
              lineHeight: 16,
              fill: "rgb(156 163 175)",
            },
          },
        ],
      },
    ],
  };
};

interface ChartProps {
  xAxisData: string[];
  colorMap: Record<string, string>;
}

export const Chart: FC<ChartProps> = ({ xAxisData, colorMap }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [myChart, setMyChart] = useState<echarts.ECharts | null>(null);

  const handleUpdate = () => {
    if (!myChart) return;
    myChart?.resize();
    myChart?.setOption(getOptions(myChart, xAxisData, colorMap));
  };

  useEffect(() => {
    if (chartRef.current) {
      const myChartInstance = echarts.init(chartRef.current);
      myChartInstance.setOption(
        getOptions(myChartInstance, xAxisData, colorMap)
      );
      setMyChart(myChartInstance);
    }
  }, []);

  useLayoutEffect(() => {
    if (!myChart) return;
    window.addEventListener("resize", handleUpdate);
    return () => {
      myChart?.dispose();
      window.removeEventListener("resize", handleUpdate);
    };
  }, [myChart]);

  return <div ref={chartRef} className="w-full h-full" />;
};
