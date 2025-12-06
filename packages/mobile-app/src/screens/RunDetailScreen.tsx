/**
 * RunDetailScreen - Detailed run view
 * Shows comprehensive run statistics, segments, laps, and map visualization
 * CLEAN: Pure presentation component
 * MODULAR: Self-contained screen component
 */

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RunSession } from '@runrealm/shared-core/services/run-tracking-service';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  RunDetail: { run: RunSession };
};

type RunDetailScreenRouteProp = RouteProp<RootStackParamList, 'RunDetail'>;
type RunDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RunDetail'>;

export const RunDetailScreen: React.FC = () => {
  const route = useRoute<RunDetailScreenRouteProp>();
  const navigation = useNavigation<RunDetailScreenNavigationProp>();
  const { run } = route.params;

  const formatDuration = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const formatDistance = (meters: number): string => {
    const km = meters / 1000;
    if (km >= 1) {
      return `${km.toFixed(2)} km`;
    }
    return `${meters.toFixed(0)} m`;
  };

  const formatPace = (speedMps: number): string => {
    if (speedMps === 0) return '--:--';
    const paceSecondsPerKm = 1000 / speedMps;
    const minutes = Math.floor(paceSecondsPerKm / 60);
    const seconds = Math.floor(paceSecondsPerKm % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')} min/km`;
  };

  const formatDateTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const caloriesEstimate = Math.round((run.totalDistance / 1000) * 60); // Rough estimate: 60 cal/km

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Run Details</Text>
        <View style={styles.backButton} />
      </View>

      {/* Main Stats */}
      <View style={styles.mainStats}>
        <View style={styles.mainStatItem}>
          <Text style={styles.mainStatValue}>{formatDistance(run.totalDistance)}</Text>
          <Text style={styles.mainStatLabel}>Distance</Text>
        </View>
        <View style={styles.mainStatItem}>
          <Text style={styles.mainStatValue}>{formatDuration(run.totalDuration)}</Text>
          <Text style={styles.mainStatLabel}>Duration</Text>
        </View>
        <View style={styles.mainStatItem}>
          <Text style={styles.mainStatValue}>{formatPace(run.averageSpeed)}</Text>
          <Text style={styles.mainStatLabel}>Avg Pace</Text>
        </View>
      </View>

      {/* Run Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Run Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Started:</Text>
          <Text style={styles.infoValue}>{formatDateTime(run.startTime)}</Text>
        </View>
        {run.endTime && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ended:</Text>
            <Text style={styles.infoValue}>{formatDateTime(run.endTime)}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>{run.status}</Text>
        </View>
        {run.territoryEligible && (
          <View style={[styles.infoRow, styles.territoryEligible]}>
            <Text style={styles.infoLabel}>🏰 Territory:</Text>
            <Text style={styles.infoValue}>Eligible for claiming</Text>
          </View>
        )}
      </View>

      {/* Performance Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Performance</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{(run.averageSpeed * 3.6).toFixed(1)}</Text>
            <Text style={styles.statLabel}>km/h</Text>
            <Text style={styles.statSubLabel}>Avg Speed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{(run.maxSpeed * 3.6).toFixed(1)}</Text>
            <Text style={styles.statLabel}>km/h</Text>
            <Text style={styles.statSubLabel}>Max Speed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{caloriesEstimate}</Text>
            <Text style={styles.statLabel}>cal</Text>
            <Text style={styles.statSubLabel}>Est. Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{run.points.length}</Text>
            <Text style={styles.statLabel}>points</Text>
            <Text style={styles.statSubLabel}>GPS Points</Text>
          </View>
        </View>
      </View>

      {/* Segments */}
      {run.segments && run.segments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Segments ({run.segments.length})</Text>
          {run.segments.slice(0, 5).map((segment, index) => (
            <View key={index} style={styles.segmentItem}>
              <Text style={styles.segmentNumber}>Segment {index + 1}</Text>
              <View style={styles.segmentStats}>
                <Text style={styles.segmentStat}>
                  {formatDistance(segment.distance)} • {formatDuration(segment.duration)}
                </Text>
              </View>
            </View>
          ))}
          {run.segments.length > 5 && (
            <Text style={styles.moreText}>+{run.segments.length - 5} more segments</Text>
          )}
        </View>
      )}

      {/* Laps */}
      {run.laps && run.laps.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Laps ({run.laps.length})</Text>
          {run.laps.slice(0, 5).map((lap, index) => (
            <View key={index} style={styles.lapItem}>
              <Text style={styles.lapNumber}>Lap {index + 1}</Text>
              <View style={styles.lapStats}>
                <Text style={styles.lapStat}>
                  {formatDistance(lap.distance)} • {formatDuration(lap.duration)}
                </Text>
              </View>
            </View>
          ))}
          {run.laps.length > 5 && (
            <Text style={styles.moreText}>+{run.laps.length - 5} more laps</Text>
          )}
        </View>
      )}

      {/* External Activity */}
      {run.externalActivity && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Imported Activity</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Source:</Text>
            <Text style={styles.infoValue}>{run.externalActivity.source.toUpperCase()}</Text>
          </View>
          {run.externalActivity.elevationGain && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Elevation:</Text>
              <Text style={styles.infoValue}>{run.externalActivity.elevationGain}m</Text>
            </View>
          )}
        </View>
      )}

      {/* Geohash */}
      {run.geohash && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Location</Text>
          <Text style={styles.geohashText}>{run.geohash}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    minWidth: 80,
  },
  backButtonText: {
    fontSize: 16,
    color: '#00ff88',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  mainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    paddingVertical: 24,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 12,
  },
  mainStatItem: {
    alignItems: 'center',
  },
  mainStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00ff88',
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  territoryEligible: {
    backgroundColor: 'rgba(155, 89, 182, 0.2)',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#00ff88',
    fontWeight: '600',
    marginBottom: 2,
  },
  statSubLabel: {
    fontSize: 12,
    color: '#999',
  },
  segmentItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  segmentNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  segmentStats: {
    flexDirection: 'row',
  },
  segmentStat: {
    fontSize: 12,
    color: '#ccc',
  },
  lapItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  lapNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  lapStats: {
    flexDirection: 'row',
  },
  lapStat: {
    fontSize: 12,
    color: '#ccc',
  },
  moreText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  geohashText: {
    fontSize: 12,
    color: '#ccc',
    fontFamily: 'monospace',
  },
});
