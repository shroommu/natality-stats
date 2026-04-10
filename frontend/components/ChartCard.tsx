import type { ReactNode } from "react";
import { Card } from "./Card";
import { cx } from "./uiStyles";

type ChartPoint = {
  label: string;
  value: number;
};

type ChartCardProps = {
  title: string;
  description?: string;
  data: ChartPoint[];
  footer?: ReactNode;
  valueFormatter?: (value: number) => string;
};

export function ChartCard({
  title,
  description,
  data,
  footer,
  valueFormatter = (value) => value.toLocaleString(),
}: ChartCardProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);

  return (
    <Card title={title} description={description}>
      <div className="flex flex-col gap-3">
        {data.map((point) => {
          const widthPercent = Math.max((point.value / maxValue) * 100, 3);

          return (
            <div key={point.label} className="grid grid-cols-[100px_1fr_auto] items-center gap-3">
              <span className="truncate text-xs text-foreground/70">{point.label}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-foreground/70 transition-[width] duration-300"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium">{valueFormatter(point.value)}</span>
            </div>
          );
        })}
      </div>
      {footer ? <div className={cx("mt-4 text-xs text-foreground/70")}>{footer}</div> : null}
    </Card>
  );
}
