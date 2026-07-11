import React from "react";
import Mochi from "./ui/Mochi";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

/**
 * Reusable empty-state card shown when a page has no content yet.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.icon] - Optional custom icon element. If omitted, Mochi is rendered.
 * @param {string} props.title - Short heading describing the empty state.
 * @param {string} props.description - Supporting text.
 * @param {'happy' | 'studying' | 'sleeping' | 'cheering' | 'thinking'} [props.mochiPose] - Pose of Mochi (default: 'sleeping').
 * @param {string} [props.actionLabel] - Label for CTA button.
 * @param {string} [props.linkTo] - Router Link destination path.
 * @param {function} [props.onAction] - Button click action callback.
 */
export default function EmptyState({ 
  icon, 
  title, 
  description,
  mochiPose = "sleeping",
  actionLabel,
  linkTo,
  onAction
}) {
  return (
    <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px] select-none">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary-100/50 dark:bg-primary-950/30 blur-2xl rounded-full scale-75"></div>
        {icon ? (
          <div className="w-20 h-20 bg-primary-50 dark:bg-primary-950/40 rounded-full flex items-center justify-center text-primary-500 border border-primary-100/50 relative z-10">
            {icon}
          </div>
        ) : (
          <Mochi pose={mochiPose} size={150} className="relative z-10" />
        )}
      </div>
      
      <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-150 mb-2 font-heading">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm font-medium leading-relaxed mb-8">
        {description}
      </p>

      {actionLabel && (
        <>
          {linkTo ? (
            <Link to={linkTo}>
              <Button variant="primary" size="md">
                {actionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="md" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
