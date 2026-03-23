/**
 * Stores barrel export
 * Import all stores from this file for cleaner imports
 */

// Common stores
export { useCommonStore } from './common.store';
export { useConfigStore } from './config.store';
export { useHistoryStore } from './history.store';

// Game stores (re-exported from game folder)
export * from './game';
