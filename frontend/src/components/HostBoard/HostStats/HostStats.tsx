import { Grid, ButtonBase, makeStyles } from "@material-ui/core";
import { Alert } from "@mui/material";
import React from "react";
import { MetricType, RuleType } from "../../../common/enums";
import { extractHostRule, extractMetric } from "../../../util/util";
import MetricPieChart from "./MetricPieChart";
import InfluxHistory from "../InfluxHistory/InfluxHistory";
import { Host } from "../../../common/types";

const useStyles = makeStyles(() => ({
  pieChartButton: {
    paddingTop: "40px",
  },
  inactiveColor: {
    backgroundColor: "#111111",
  },
  activeColor: {
    backgroundColor: "#222222",
  },
  shortenTopMargin: {
    marginTop: "-12px",
  },
}));

interface HostStatsProps {
  hostData: Host;
}

const HostStats: React.FC<HostStatsProps> = ({ hostData }) => {
  const summary = hostData?.hostSummary;
  const hostId = hostData?.id;

  const classes = useStyles();
  const mem = extractMetric(summary?.metrics, MetricType.MEMORY_USAGE);
  const memRule = extractHostRule(hostData?.hostRules, RuleType.MEMORY_USAGE);
  const cpu = extractMetric(summary?.metrics, MetricType.CPU_USAGE);
  const cpuRule = extractHostRule(hostData?.hostRules, RuleType.CPU_USAGE);
  const disk = extractMetric(summary?.metrics, MetricType.DISK_USAGE);
  const diskRule = extractHostRule(hostData?.hostRules, RuleType.DISK_USAGE);

  const [activeMetric, setActiveMetric] = React.useState<string>(
    MetricType.CPU_USAGE
  );
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <ButtonBase
            className={[
              activeMetric == MetricType.CPU_USAGE
                ? classes.activeColor
                : classes.inactiveColor,
              classes.pieChartButton,
            ]
              .filter((e) => !!e)
              .join(" ")}
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              setActiveMetric(MetricType.CPU_USAGE);
            }}
          >
            {mem == undefined ? (
              <Alert severity="error"> No CPU data to show </Alert>
            ) : (
              <MetricPieChart metric={cpu} name="CPU" rule={cpuRule} />
            )}
          </ButtonBase>
        </Grid>
        <Grid item xs={4}>
          <ButtonBase
            className={[
              activeMetric == MetricType.MEMORY_USAGE
                ? classes.activeColor
                : classes.inactiveColor,
              classes.pieChartButton,
            ]
              .filter((e) => !!e)
              .join(" ")}
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              setActiveMetric(MetricType.MEMORY_USAGE);
            }}
          >
            {mem == undefined ? (
              <Alert severity="error"> No memory data to show </Alert>
            ) : (
              <MetricPieChart metric={mem} name="MEMORY" rule={memRule} />
            )}
          </ButtonBase>
        </Grid>
        <Grid item xs={4}>
          <ButtonBase
            className={[
              activeMetric == MetricType.DISK_USAGE
                ? classes.activeColor
                : classes.inactiveColor,
              classes.pieChartButton,
            ]
              .filter((e) => !!e)
              .join(" ")}
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              setActiveMetric(MetricType.DISK_USAGE);
            }}
          >
            {mem == undefined ? (
              <Alert severity="error"> No disk data to show </Alert>
            ) : (
              <MetricPieChart metric={disk} name="DISK" rule={diskRule} />
            )}
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid
        item
        className={[classes.activeColor, classes.shortenTopMargin]
          .filter((e) => !!e)
          .join(" ")}
      >
        <InfluxHistory hostId={hostId} activeMetric={activeMetric} />
      </Grid>
    </>
  );
};

export default HostStats;