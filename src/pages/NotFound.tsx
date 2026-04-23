import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <div className="text-8xl mb-6">🔎</div>
      <h1 className="font-display font-black text-5xl">Page not found</h1>
      <p className="mt-3 text-gray-600">We looked in every pantry — nothing here.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">Back to home</Link>
    </div>
  )
}
