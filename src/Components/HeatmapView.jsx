import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";

export default function HeatmapView({ values }) {
  const endDate = new Date();
  const startDate = subDays(endDate, 90);

  return (
    <div className="w-full">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        showWeekdayLabels={false}
        classForValue={(value) => {
          if (!value || value.count === 0) return "heat-0";
          if (value.count <= 1) return "heat-1";
          if (value.count <= 2) return "heat-2";
          if (value.count <= 3) return "heat-3";
          return "heat-4";
        }}
      />

      <style>{`
        .react-calendar-heatmap text {
          fill: #6b7280;
          font-size: 10px;
        }

        .react-calendar-heatmap rect {
          rx: 3px;
          ry: 3px;
        }

        /* Light Mode – Primary scale */
        rect.heat-0 { fill: #f3f4f6 !important; }
        rect.heat-1 { fill: #c4ded0 !important; }
        rect.heat-2 { fill: #9ac5b2 !important; }
        rect.heat-3 { fill: #4b8b74 !important; }
        rect.heat-4 { fill: #31594b !important; }

        /* Dark Mode – Primary scale */
        html.dark .react-calendar-heatmap text { fill: #9ca3af; }
        html.dark rect.heat-0 { fill: #1f2937 !important; }
        html.dark rect.heat-1 { fill: #223b33 !important; }
        html.dark rect.heat-2 { fill: #28473d !important; }
        html.dark rect.heat-3 { fill: #3a6f5d !important; }
        html.dark rect.heat-4 { fill: #6ca891 !important; }

        .react-calendar-heatmap rect:hover {
          stroke: #3a6f5d;
          stroke-width: 1px;
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
