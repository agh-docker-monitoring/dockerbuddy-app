package pl.edu.agh.dockerbuddy.model

import lombok.ToString
import pl.edu.agh.dockerbuddy.model.metric.HostSummary

@ToString
data class HostWithSummary(
    val id: Long,
    val hostName: String,
    val ip: String,
    val hostSummary: HostSummary // TODO consider making nullable in order to always return all hosts, even without metrics
)