import React from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { humanFileSize, extractMetric } from "../../util/util";
import ProgressBarComponent from "./ProgressBarComponent";
import ContainerCardComponent from "./ContainerCardComponent";
import { Container, Host } from "../../common/types";
import { Link } from "react-router-dom";
import { MetricType } from "../../common/enums";

const useStyles = makeStyles((theme) => ({
  card: {
    borderColor: "#1A1C19",
    backgroundColor: "transparent",
  },
  settingsColor: {
    color: theme.palette.primary.main,
  },
  nameColor: {
    color: "rgba(229, 209, 208, 1)",
  },
}));

const HostCardComponent: React.FC<{ host: Host }> = (props) => {
  const classes = useStyles();
  const host = props.host;
  const hostSummary = props.host.hostSummary;

  const diskUsage = extractMetric(hostSummary?.metrics, MetricType.DISK_USAGE);
  const memoryUsage = extractMetric(
    hostSummary?.metrics,
    MetricType.MEMORY_USAGE
  );
  const cpuUsage = extractMetric(hostSummary?.metrics, MetricType.CPU_USAGE);

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        title={
          <>
            <Typography
              variant="h6"
              style={{ display: "inline-block" }}
              className={classes.nameColor}
            >
              {host.hostName}
            </Typography>
            <Typography variant="h6" style={{ display: "inline-block" }}>
              {": " + host.ip}
            </Typography>
          </>
        }
      />
      <Link
        to={{ pathname: `/host/${host.id}`, state: { id: host.id } }}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <CardContent>
          {diskUsage !== undefined ? (
            <ProgressBarComponent
              name="Disk"
              used={humanFileSize(diskUsage.value)}
              total={humanFileSize(diskUsage.total)}
              percent={diskUsage.percent}
            />
          ) : (
            <Grid item>
              <Alert severity="error"> NO DISC INFO </Alert>
            </Grid>
          )}
          {memoryUsage !== undefined ? (
            <ProgressBarComponent
              name="Memory"
              used={humanFileSize(memoryUsage.value)}
              total={humanFileSize(memoryUsage.total)}
              percent={memoryUsage.percent}
            />
          ) : (
            <Grid item>
              <Alert severity="error"> NO VMEM INFO </Alert>
            </Grid>
          )}
          {cpuUsage !== undefined ? (
            <ProgressBarComponent
              name="CPU"
              used={cpuUsage.value + "%"}
              percent={cpuUsage.percent}
            />
          ) : (
            <Grid item>
              <Alert severity="error"> NO CPU INFO </Alert>
            </Grid>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ display: "inline-block" }}>
                Containers:
              </Typography>
            </Grid>
            {host.hostSummary?.containers !== undefined ? (
              host.hostSummary.containers.map((cont: Container) => {
                return (
                  <Grid item xs={4} key={cont.id}>
                    <ContainerCardComponent container={cont} />
                  </Grid>
                );
              })
            ) : (
              <Grid item>
                <Alert severity="error"> NO CONTAINERS INFO </Alert>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Link>
    </Card>
  );
};

export default HostCardComponent;
