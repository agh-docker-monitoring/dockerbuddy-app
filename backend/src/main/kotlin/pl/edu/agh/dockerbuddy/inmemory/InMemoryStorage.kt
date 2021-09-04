package pl.edu.agh.dockerbuddy.inmemory

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import pl.edu.agh.dockerbuddy.model.metric.HostSummary

@Service
@Qualifier("InMemoryStorage")
class InMemoryStorage : InMemory {
    private val storage: MutableMap<Long, HostSummary> = HashMap()

    override fun getAllHostSummaries(): List<HostSummary> = storage.values.toList()

    override fun getHostSummary(hostId: Long): HostSummary? = storage[hostId]

    override fun saveHostSummary(hostId: Long, hostSummary: HostSummary) {
        storage[hostId] = hostSummary
    }

    override fun deleteHost(hostId: Long) {
        storage.remove(hostId)
    }
}