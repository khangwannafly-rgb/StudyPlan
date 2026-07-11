import React, { memo } from "react";
import { weeklyHours, subjectDistribution, heatmapValues } from "../utils/calcStats";
import HeatmapView from "../Components/HeatmapView";
import LineChart from "../Components/LineChart";
import DonutChart from "../Components/DonutChart";
import ProgressBar from "../Components/ProgressBar";
import Card from "../Components/ui/Card";
import Widget from "../Components/ui/Widget";
import Badge from "../Components/ui/Badge";
import { Sparkles, BarChart3, PieChart, TrendingUp, Target } from "lucide-react";

function Dashboard() {
  const logs = JSON.parse(localStorage.getItem("task_logs") || "[]");

  const weekly = weeklyHours(logs);
  const dist = subjectDistribution(logs);
  const heat = heatmapValues(logs);

  const totalMinutes = logs.reduce((s, x) => s + (x.minutes || 0), 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight font-heading flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            Analytics Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
            Track your study journey with Mochi 📊
          </p>
        </div>
        <Badge variant="primary" className="text-sm px-4 py-1.5 self-start">
          {totalHours}h total logged
        </Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect className="md:col-span-2">
          <Widget
            title="Activity Heatmap"
            subtitle="Last 90 days of study sessions"
            icon={BarChart3}
            hoverEffect={false}
          >
            <HeatmapView values={heat} />
          </Widget>
        </Card>

        <Card hoverEffect className="flex flex-col">
          <Widget
            title="Subject Distribution"
            subtitle="Time spent per subject"
            icon={PieChart}
            hoverEffect={false}
          >
            <div className="w-full max-w-[220px] mx-auto flex-1 flex items-center justify-center py-4">
              {dist.length > 0 ? (
                <DonutChart data={dist} />
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium text-center">
                  No data yet — start studying to see your breakdown!
                </p>
              )}
            </div>
          </Widget>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverEffect>
          <Widget
            title="Weekly Hours"
            subtitle="Study time per day this week"
            icon={TrendingUp}
            hoverEffect={false}
          >
            <LineChart data={weekly} />
          </Widget>
        </Card>

        <Card hoverEffect className="flex flex-col justify-center">
          <Widget
            title="Goal Progress"
            subtitle="Total time logged toward 10-hour milestone"
            icon={Target}
            hoverEffect={false}
          >
            <div className="py-4">
              <ProgressBar title="Total Time Logged" value={totalMinutes} max={60 * 10} />
            </div>
          </Widget>
        </Card>
      </div>
    </div>
  );
}

export default memo(Dashboard);
