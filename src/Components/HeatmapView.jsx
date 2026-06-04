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

        /* Light Mode – Teal scale */
        rect.heat-0 { fill: #f3f4f6 !important; }
        rect.heat-1 { fill: #99f6e4 !important; }
        rect.heat-2 { fill: #2dd4bf !important; }
        rect.heat-3 { fill: #0d9488 !important; }
        rect.heat-4 { fill: #115e59 !important; }

        /* Dark Mode – Teal scale */
        html.dark .react-calendar-heatmap text { fill: #9ca3af; }
        html.dark rect.heat-0 { fill: #1f2937 !important; }
        html.dark rect.heat-1 { fill: #134e4a !important; }
        html.dark rect.heat-2 { fill: #0f766e !important; }
        html.dark rect.heat-3 { fill: #14b8a6 !important; }
        html.dark rect.heat-4 { fill: #5eead4 !important; }

        .react-calendar-heatmap rect:hover {
          stroke: #0f766e;
          stroke-width: 1px;
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
