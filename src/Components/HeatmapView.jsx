import React, { memo } from "react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";

function HeatmapView({ values }) {
  const endDate = new Date();
  const startDate = subDays(endDate, 90);

  return (
    <div className="w-full overflow-x-auto">
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
          fill: #FF7DB6;
          font-size: 10px;
          font-family: 'Nunito', sans-serif;
        }

        .react-calendar-heatmap rect {
          rx: 4px;
          ry: 4px;
        }

        /* Light Mode – Pink scale */
        rect.heat-0 { fill: #FFEAF5 !important; }
        rect.heat-1 { fill: #FFC7DD !important; }
        rect.heat-2 { fill: #FF94C8 !important; }
        rect.heat-3 { fill: #FF7DB6 !important; }
        rect.heat-4 { fill: #FF5FA2 !important; }

        /* Dark Mode – Pastel pink scale */
        html.dark .react-calendar-heatmap text { fill: #FF94C8; }
        html.dark rect.heat-0 { fill: #2D2230 !important; }
        html.dark rect.heat-1 { fill: #4A2D42 !important; }
        html.dark rect.heat-2 { fill: #7D3D62 !important; }
        html.dark rect.heat-3 { fill: #C93275 !important; }
        html.dark rect.heat-4 { fill: #FF5FA2 !important; }

        .react-calendar-heatmap rect:hover {
          stroke: #FF5FA2;
          stroke-width: 1.5px;
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default memo(HeatmapView);
