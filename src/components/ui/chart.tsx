'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '@/lib/utils';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
): ChartConfig[string] | undefined {
  if (typeof payload !== 'object' || payload === null) {
    return config[key];
  }

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme ?? itemConfig.color,
  );

  if (colorConfig.length === 0) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`,
          )
          .join(''),
      }}
    />
  );
};

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replaceAll(':', '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/40 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none flex aspect-video justify-center text-xs",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

type TooltipPayloadItem = {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
  fill?: string;
  stroke?: string;
};

type TooltipIndicatorProps = {
  indicator: 'dot' | 'line' | 'dashed';
  color?: string;
  nestLabel: boolean;
};

function TooltipIndicator({ indicator, color, nestLabel }: TooltipIndicatorProps) {
  return (
    <div
      className={cn('shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)', {
        'h-2.5 w-2.5': indicator === 'dot',
        'w-1': indicator === 'line',
        'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
        'my-0.5': nestLabel && indicator === 'dashed',
      })}
      style={
        {
          '--color-bg': color,
          '--color-border': color,
        } as React.CSSProperties
      }
    />
  );
}

function TooltipItemText({
  item,
  nestLabel,
  tooltipLabel,
  label,
}: {
  item: TooltipPayloadItem;
  nestLabel: boolean;
  tooltipLabel: React.ReactNode;
  label?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-1 justify-between leading-none',
        nestLabel ? 'items-end' : 'items-center',
      )}
    >
      <div className="grid gap-1.5">
        {nestLabel ? tooltipLabel : null}
        <span className="text-muted-foreground">{label ?? item.name}</span>
      </div>
      {item.value !== undefined && (
        <span className="font-mono font-medium text-foreground tabular-nums">
          {typeof item.value === 'number' ? item.value.toLocaleString('vi-VN') : item.value}
        </span>
      )}
    </div>
  );
}

type TooltipItemRowProps = {
  item: TooltipPayloadItem;
  index: number;
  indicator: 'dot' | 'line' | 'dashed';
  hideIndicator: boolean;
  nestLabel: boolean;
  tooltipLabel: React.ReactNode;
  config: ChartConfig;
  color?: string;
  nameKey?: string;
  formatter?: (
    value: number | string | undefined,
    name: string | number | undefined,
    item: TooltipPayloadItem,
    index: number,
    payload: TooltipPayloadItem[],
  ) => React.ReactNode;
  payload: TooltipPayloadItem[];
};

function TooltipItemRow({
  item,
  index,
  indicator,
  hideIndicator,
  nestLabel,
  tooltipLabel,
  config,
  color,
  nameKey,
  formatter,
  payload,
}: TooltipItemRowProps) {
  const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`;
  const itemConfig = getPayloadConfigFromPayload(config, item, key);
  const indicatorColor = (color ?? item.payload?.fill ?? item.color) as string | undefined;

  if (formatter && item?.value !== undefined && item.name) {
    return (
      <div className="flex w-full flex-wrap items-center gap-2">
        {formatter(item.value, item.name, item, index, payload)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
        indicator === 'dot' && 'items-center',
      )}
    >
      {itemConfig?.icon ? (
        <itemConfig.icon />
      ) : (
        !hideIndicator && (
          <TooltipIndicator indicator={indicator} color={indicatorColor} nestLabel={nestLabel} />
        )
      )}
      <TooltipItemText
        item={item}
        nestLabel={nestLabel}
        tooltipLabel={tooltipLabel}
        label={itemConfig?.label}
      />
    </div>
  );
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  className?: string;
  indicator?: 'dot' | 'line' | 'dashed';
  hideLabel?: boolean;
  hideIndicator?: boolean;
  label?: string | number;
  labelFormatter?: (label: string | number, payload: TooltipPayloadItem[]) => React.ReactNode;
  labelClassName?: string;
  formatter?: (
    value: number | string | undefined,
    name: string | number | undefined,
    item: TooltipPayloadItem,
    index: number,
    payload: TooltipPayloadItem[],
  ) => React.ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
}) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === 'string' ? (config[label]?.label ?? label) : itemConfig?.label;

    if (labelFormatter && label !== undefined) {
      return (
        <div className={cn('font-medium', labelClassName)}>{labelFormatter(label, payload)}</div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <div
      className={cn(
        'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {nestLabel ? null : tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => (
          <TooltipItemRow
            key={item.dataKey ?? index}
            item={item}
            index={index}
            indicator={indicator}
            hideIndicator={hideIndicator}
            nestLabel={nestLabel}
            tooltipLabel={tooltipLabel}
            config={config}
            color={color}
            nameKey={nameKey}
            formatter={formatter}
            payload={payload}
          />
        ))}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: {
  className?: string;
  hideIcon?: boolean;
  payload?: {
    value?: string | number;
    id?: string;
    type?: string;
    color?: string;
    dataKey?: string | number;
  }[];
  verticalAlign?: 'top' | 'bottom';
  nameKey?: string;
}) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey ?? item.dataKey ?? 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            <span className="text-xs font-medium text-muted-foreground">{itemConfig?.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
