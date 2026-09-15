'use client'

interface Props {
  lastSynced: Date | null
  onSync: () => void
  syncing: boolean
}

export default function SyncStatus({ lastSynced, onSync, syncing }: Props) {
  const label = lastSynced
    ? `Last synced: ${lastSynced.toLocaleTimeString()}`
    : 'Never synced'

  return (
    <div className="flex items-center gap-3 text-xs text-gray-500 px-4 py-2 border-t border-gray-100">
      <span>{label}</span>
      <button
        onClick={onSync}
        disabled={syncing}
        className="text-blue-600 hover:underline disabled:opacity-50"
      >
        {syncing ? 'Syncing...' : 'Sync now'}
      </button>
    </div>
  )
}
