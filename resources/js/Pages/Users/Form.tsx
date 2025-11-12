import React from 'react'

export default function Form({ data, setData, processing, onSubmit, submitLabel = 'Save' }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-lg">
      <input
        className="rounded border border-white/20 bg-transparent px-3 py-2 text-white placeholder:text-white/50"
        placeholder="Name"
        value={data.name || ''}
        onChange={e => setData('name', e.target.value)}
        autoComplete="name"
        required
      />
      <input
        className="rounded border border-white/20 bg-transparent px-3 py-2 text-white placeholder:text-white/50"
        type="email"
        placeholder="Email"
        value={data.email || ''}
        onChange={e => setData('email', e.target.value)}
        autoComplete="email"
        required
      />
      <input
        className="rounded border border-white/20 bg-transparent px-3 py-2 text-white placeholder:text-white/50"
        type="password"
        placeholder="Password (leave blank to keep)"
        value={data.password || ''}
        onChange={e => setData('password', e.target.value)}
        autoComplete="new-password"
      />
      <button
        className="rounded bg-white/10 px-4 py-2 hover:bg-white/20 disabled:opacity-50"
        disabled={processing}
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  )
}
