import { MetricType, AlertType, RuleType, ReportStatus } from "../common/enums";
import { PercentMetric, HostPercentRule, BasicMetric } from "../common/types";
import { alertColors } from "./alertStyle";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function humanFileSize(size: number | undefined): string {
  if (size === 0 || size === undefined) return "0";
  const i = Math.floor(Math.log(+size) / Math.log(1024));
  const y: any = +size / Math.pow(1024, i); //TODO number throw error
  return (
    y.toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i]
  );
}

function addZero(i: number) {
  if (i < 10) {
    return "0" + i;
  }
  return i;
}

export function parseDateToHour(date: Date): string {
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());
  const s = addZero(date.getSeconds());
  return h + ":" + m + ":" + s;
}

export function parseDateToDDMMYYYY(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();

  return dd + "." + mm + "." + yyyy;
}

export function extractMetricPercent(
  metrics: PercentMetric[],
  type: MetricType
): PercentMetric | undefined {
  return metrics?.find(
    (metric) => MetricType[metric.metricType] === type.valueOf()
  );
}

export function extractMetricBasic(
  metrics: BasicMetric[],
  type: MetricType
): BasicMetric | undefined {
  return metrics?.find(
    (metric) => MetricType[metric.metricType] === type.valueOf()
  );
}

export function extractHostRule(
  rules: HostPercentRule[],
  type: RuleType
): HostPercentRule | undefined {
  return rules?.find((rule) => RuleType[rule.type] === type.valueOf());
}

export function alertTypeToColor(type: AlertType): string {
  switch (type) {
    case AlertType.CRITICAL:
      return alertColors.red;
    case AlertType.WARN:
      return alertColors.yellow;
  }
  return alertColors.default;
}

export function statusTypeToColor(
  type: AlertType,
  reportStatus: ReportStatus,
  status: string
): string {
  switch (reportStatus) {
    case ReportStatus.WATCHED:
      return alertTypeToColor(type);
    default:
      if (status !== "RUNNING") {
        return alertColors.disabled;
      } else {
        return alertColors.default;
      }
  }
}

export function paramsToString(params: any): string {
  let result = "";
  Object.keys(params).forEach((k) => {
    result += `${k}=${params[k]}&`;
  });
  if (result.endsWith("&")) {
    result = result.slice(0, -1);
  }
  return result;
}
