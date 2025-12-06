/**
 * RunSummaryModal - Post-run summary modal
 * Shows run statistics and achievements after run completion
 * CLEAN: Pure presentation component
 * MODULAR: Self-contained modal component
 */

import { RunSession } from '@runrealm/shared-core/services/run-tracking-service';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RunSummaryModalProps {
  visible: boolean;
  runData: RunSession;
  onClose: () => void;
  onViewDetails?: () => void;
}

export const RunSummaryModal: React.FC<RunSummaryModalProps> = React.memo(
  ({ visible, runData, onClose, onViewDetails }) => {
    if (!runData) return null;

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

    const caloriesEstimate = Math.round((runData.totalDistance / 1000) * 60); // Rough estimate: 60 cal/km

    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>🏃 Run Complete!</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Main Stats */}
              <View style={styles.mainStats}>
                <View style={styles.mainStatItem}>
                  <Text style={styles.mainStatValue}>{formatDistance(runData.totalDistance)}</Text>
                  <Text style={styles.mainStatLabel}>Distance</Text>
                </View>
                <View style={styles.mainStatItem}>
                  <Text style={styles.mainStatValue}>{formatDuration(runData.totalDuration)}</Text>
                  <Text style={styles.mainStatLabel}>Duration</Text>
                </View>
                <View style={styles.mainStatItem}>
                  <Text style={styles.mainStatValue}>{formatPace(runData.averageSpeed)}</Text>
                  <Text style={styles.mainStatLabel}>Avg Pace</Text>
                </View>
              </View>

              {/* Secondary Stats */}
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{(runData.averageSpeed * 3.6).toFixed(1)}</Text>
                  <Text style={styles.statLabel}>km/h</Text>
                  <Text style={styles.statSubLabel}>Avg Speed</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{(runData.maxSpeed * 3.6).toFixed(1)}</Text>
                  <Text style={styles.statLabel}>km/h</Text>
                  <Text style={styles.statSubLabel}>Max Speed</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{caloriesEstimate}</Text>
                  <Text style={styles.statLabel}>cal</Text>
                  <Text style={styles.statSubLabel}>Est. Calories</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{runData.points.length}</Text>
                  <Text style={styles.statLabel}>points</Text>
                  <Text style={styles.statSubLabel}>GPS Points</Text>
                </View>
              </View>

              {/* Segments */}
              {runData.segments && runData.segments.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📊 Segments</Text>
                  <Text style={styles.sectionValue}>
                    {runData.segments.length} segments recorded
                  </Text>
                </View>
              )}

              {/* Laps */}
              {runData.laps && runData.laps.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>⏱️ Laps</Text>
                  <Text style={styles.sectionValue}>{runData.laps.length} laps completed</Text>
                </View>
              )}

              {/* Territory Eligibility */}
              {runData.territoryEligible && (
                <View style={[styles.section, styles.territoryEligible]}>
                  <Text style={styles.territoryTitle}>🏰 Territory Eligible!</Text>
                  <Text style={styles.territoryText}>
                    This run qualifies for territory claiming. You can claim a territory NFT on the
                    blockchain.
                  </Text>
                </View>
              )}

              {/* External Activity */}
              {runData.externalActivity && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📱 Imported Activity</Text>
                  <Text style={styles.sectionValue}>
                    From {runData.externalActivity.source.toUpperCase()}
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Actions */}
            <View style={styles.actions}>
              {onViewDetails && (
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={onViewDetails}
                >
                  <Text style={styles.secondaryButtonText}>View Details</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={onClose}>
                <Text style={styles.primaryButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

RunSummaryModal.displayName = 'RunSummaryModal';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 28,
    color: '#999',
    lineHeight: 32,
  },
  content: {
    padding: 20,
  },
  mainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 12,
  },
  mainStatItem: {
    alignItems: 'center',
  },
  mainStatValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00ff88',
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
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
  section: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  sectionValue: {
    fontSize: 14,
    color: '#ccc',
  },
  territoryEligible: {
    backgroundColor: 'rgba(155, 89, 182, 0.2)',
    borderWidth: 1,
    borderColor: '#9b59b6',
  },
  territoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9b59b6',
    marginBottom: 8,
  },
  territoryText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#00ff88',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  secondaryButton: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
